import {
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    ConfirmOptions,
    TransactionInstruction,
    PublicKey,
    Keypair,
    Signer,
  } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Controller, findAddrSync, Zo, ZoDepository } from "@uxdprotocol/uxd-client"
import { InstructionNamespace, Idl } from '@project-serum/anchor';
import { uxdIdl } from './uxd-idl';
import NamespaceFactory from './instructionNamespace';
import { uxdProgramId, testerProgramId } from './constants';

export class UXD<UxdIdl extends Idl = Idl>  {
    public instruction: InstructionNamespace<UxdIdl>;

    public constructor(programId: PublicKey) {
        this.instruction = NamespaceFactory.buildInstructionNamespace(uxdIdl, programId);
    }
    
    public async createRegisterZoDepositoeryInstruction(
        controller: Controller,
        depository: ZoDepository,
        zo: Zo,
        authority: PublicKey,
        controlAccount: PublicKey,
        options: ConfirmOptions,
        payer?: PublicKey
    ): Promise<TransactionInstruction> {
        const bump = depository.bump;
        const zoAccountBump = depository.zoAccountBump;
        // @ts-expect-error
        return this.instruction.registerZoDepository(
        bump,
        zoAccountBump,
        {
            accounts: {
            authority,
            payer: payer ?? authority,
            controller: controller.pda,
            depository: depository.pda,
            collateralMint: depository.collateralMint,
            insuranceMint: depository.insuranceMint,
            depositoryZoAccount: depository.zoAccountPda,
            zoState: zo.state.pubkey,
            zoControl: controlAccount,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            zoProgram: zo.program.programId, // InvalidProgramId Probably an issue
            // zoProgram: new PublicKey("HAdeMzG1ZuzhWnt26iyggLhYUen3YosXiD5sgDXJoNDY"),
            rent: SYSVAR_RENT_PUBKEY,
            },
            options: options,
        }
        );
    }

    public async createCreateControlTestIx(
        signer: PublicKey,
        control: PublicKey,
        options: ConfirmOptions,
    ): Promise<TransactionInstruction> {
        // @ts-expect-error
        return this.instruction.setUp(
            {
                accounts: {
                    signer: signer,
                    control: control,
                    systemProgram: SystemProgram.programId,
                },
                options: options,
            }
        )
    }

    public async createCallCpiIx(
        authority: PublicKey,
        payer: PublicKey,
        zo: Zo,
        control: PublicKey,
        // marginAccount: PublicKey,
        // marginNonce: number,
        options: ConfirmOptions
    ): Promise<TransactionInstruction> {
        let marginAccount: PublicKey;
        let marginNonce: number;
        [marginAccount, marginNonce] = findAddrSync(
            [authority.toBuffer(), zo.state.pubkey.toBuffer(), Buffer.from('marginv1')],
            uxdProgramId
        );
        console.log("(@#!*$(@#*$(!@*#%(!@#*($!@#($");
        console.log(zo.state.pubkey.toString());
        // @ts-expect-error
        return this.instruction.callCpi(
            marginNonce,
            {
                accounts: {
                    authority: authority,
                    payer: authority,
                    state: zo.state.pubkey,
                    marginAccount: marginAccount,
                    control: control,
                    systemProgram: SystemProgram.programId,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    zoProgram: zo.program.programId,
                    rent: SYSVAR_RENT_PUBKEY,
                },
                options: options
            }
        )
    }

}