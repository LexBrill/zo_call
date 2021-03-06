import { AccountInfo, Commitment, ConfirmOptions, Keypair, Signer, Transaction } from "@solana/web3.js";
import { Controller, ZoDepository, Zo, createAssocTokenIx } from "@uxdprotocol/uxd-client";
import { registerZoDepository } from "./api";
import { CLUSTER, testerProgramId, uxdProgramId } from "./constants";
import { getProvider } from "./provider";
import { UXD } from "./uxd";
import * as anchor from "@project-serum/anchor";

export const createControlTest = async (signer: Signer, control: Keypair) => {
    const TXN_COMMIT: Commitment = "processed";
    const TXN_OPTS = {
        commitment: TXN_COMMIT,
        preflightCommittment: TXN_COMMIT,
        skipPreflight: false,
    };
    const uxdClient = new UXD(testerProgramId);
    const createControlTestIx = await uxdClient.createCreateControlTestIx(signer.publicKey, control.publicKey, TXN_OPTS);
    let signers = [];
    let tx = new Transaction();

    tx.instructions.push(createControlTestIx);
    signers.push(signer);
    signers.push(control);

    const txId = await anchor.web3.sendAndConfirmTransaction(getProvider().connection, tx, signers, TXN_OPTS);
}
