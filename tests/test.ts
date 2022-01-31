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
    callIntegrationSuite();
});

