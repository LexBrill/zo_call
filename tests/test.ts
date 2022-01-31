import { web3 } from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { Controller, MangoDepository, SOL_DECIMALS, USDC_DECIMALS, UXD_DECIMALS, ZoDepository } from "@uxdprotocol/uxd-client";
import { authority, bank } from "./constants";
import { getProvider } from "./provider";
// import { mangoDepositoryIntegrationSuite, MangoDepositoryTestSuiteParameters } from "./suite/mangoDepositoryIntegrationSuite";
import { callIntegrationSuite } from "./integrationSuite";
// import { getSolBalance } from "./utils";

const user = new Keypair();

console.log("USER =>", user.publicKey.toString());

describe("Test", () => {
    // before("Test before", async () => {
    //     const transaction = new web3.Transaction().add(
    //         web3.SystemProgram.transfer({
    //             fromPubkey: bank.publicKey,
    //             toPubkey: user.publicKey,
    //             lamports: web3.LAMPORTS_PER_SOL * 20
    //         }),
    //     );
    //     await web3.sendAndConfirmTransaction(getProvider().connection, transaction, [
    //         bank,
    //     ]);
    // });
    callIntegrationSuite(authority, user);
});

