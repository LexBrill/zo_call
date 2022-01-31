
import { Keypair } from "@solana/web3.js";
import { callIntegrationSuite } from "./integrationSuite";

const user = new Keypair();

console.log("USER =>", user.publicKey.toString());

describe("Test", () => {
    callIntegrationSuite();
});

