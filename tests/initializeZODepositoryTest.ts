import { Commitment, ConfirmOptions, Keypair, Signer, Transaction } from "@solana/web3.js";
import { Controller, ZoDepository, Zo } from "@uxdprotocol/uxd-client";
import { registerZoDepository } from "./api";
import { CLUSTER, uxdProgramId } from "./constants";
import { getProvider } from "./provider";
import { UXD } from "./uxd";
import * as anchor from "@project-serum/anchor";

export const initializeZoDepositoryTest = async (authority: Signer, control: Signer, controller: Controller, depository: ZoDepository, zo: Zo) => {
    console.group("🧭 initializeMangoDepositoryTest");
    try {
        // WHEN
        if (await getProvider().connection.getAccountInfo(depository.zoAccountPda)) {
            console.log("🚧 Already registered.");
        } else {
            // START registerZoDepository
            const TXN_COMMIT: Commitment = "processed";
            const TXN_OPTS = {
                commitment: TXN_COMMIT,
                preflightCommitment: TXN_COMMIT,
                skipPreflight: false,
            };
            let TXN_OPTIONAL: ConfirmOptions;
            // const control = new Keypair();
            const uxdClient = new UXD(uxdProgramId);
            const registerZoDepositoryIx = await uxdClient.createRegisterZoDepositoeryInstruction(controller, depository, zo, authority.publicKey, control.publicKey, TXN_OPTS);
            let signers = [];
            let tx = new Transaction();

            tx.instructions.push(registerZoDepositoryIx);
            signers.push(authority);
            signers.push(control);
            
            const txId = await anchor.web3.sendAndConfirmTransaction(getProvider().connection, tx, signers, TXN_OPTS);
            // END registerZoDepository
            // const txId = await registerZoDepository(authority, controller, depository, zo);


            // console.log(`🔗 'https://explorer.solana.com/tx/${txId}?cluster=${CLUSTER}'`);
        }

        // THEN
        console.log(`🧾 Initialized`, depository.collateralMintSymbol, "Zo Depository");
        depository.info();
        console.groupEnd();
    } catch (error) {
        console.groupEnd();
        throw error;
    }
}