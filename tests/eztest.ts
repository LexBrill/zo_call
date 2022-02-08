import { createAndInitializeZo, SOL_DECIMALS, USDC_DECIMALS, Zo, ZoDepository } from "@uxdprotocol/uxd-client";
import * as anchor from "@project-serum/anchor";
import { authority, bank, WSOL, USDC, CLUSTER } from "./constants";
import { getProvider } from "./provider";
import { Keypair, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// console.log("USER =>", user.publicKey.toString());
const TXN_COMMIT: anchor.web3.Commitment = "processed";
const TXN_OPTS = {
    commitment: TXN_COMMIT,
    preflightCommittment: TXN_COMMIT,
    skipPreflight: false,
};
const program = anchor.workspace.Test;

// const program = new PublicKey("Zo1ThtSHMh9tZGECwBDL81WJRL6s3QTHf733Tyko7KQ");

const user = new Keypair();
const control = new Keypair();
const zoDepositorySOL = new ZoDepository(WSOL, "SOL", SOL_DECIMALS, USDC, "USDC", USDC_DECIMALS, program.programId);
console.log(program.programId);
describe("Test", () => {

    it("qq", async () => {
        let zo = await createAndInitializeZo(CLUSTER, getProvider().connection);

        // 1 - CREATE CONTROL ACCOUNT (ALLOCATION)
        let txControl = new anchor.web3.Transaction();
        const ZO_CONTROL_SPAN = 8 + 4482;

        const lamportRentExempt = await getProvider().connection.getMinimumBalanceForRentExemption(ZO_CONTROL_SPAN, TXN_OPTS.commitment);


        let createAccountIx = anchor.web3.SystemProgram.createAccount({
            fromPubkey: getProvider().wallet.publicKey,
            newAccountPubkey: control.publicKey,
            lamports: lamportRentExempt,
            space: ZO_CONTROL_SPAN,
            programId: zo.program.programId,
        });

        txControl.instructions.push(createAccountIx);

        let txIdControl = await getProvider().send(txControl, [control], TXN_OPTS);
        await getProvider().connection.confirmTransaction(txIdControl, TXN_OPTS.commitment);

        // 2 - CALL OUR TEST PROGRAM TO DO CPI CALL TO INITIALIZE THE MARGIN ACCOUNT (SETUP)
        let txReg = new Transaction();
        const regIx = program.instruction.callCpi(
            zoDepositorySOL.bump,
            zoDepositorySOL.zoAccountBump,
            {
                accounts: {
                    authority: zoDepositorySOL.pda,
                    payer: bank.publicKey,
                    state: zo.state.pubkey,
                    marginAccount: zoDepositorySOL.zoAccountPda,
                    control: control.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    zoProgram: zo.program.programId, // InvalidProgramId Probably an issue
                    // zoProgram: new PublicKey("HAdeMzG1ZuzhWnt26iyggLhYUen3YosXiD5sgDXJoNDY"),
                    rent: SYSVAR_RENT_PUBKEY,
                },
                options: TXN_OPTS,
            }
        );
        txReg.instructions.push(regIx);
        await anchor.web3.sendAndConfirmTransaction(getProvider().connection, txReg, [authority, bank]);
    });
});

