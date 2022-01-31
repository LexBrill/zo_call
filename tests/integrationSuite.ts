import { Signer } from "@solana/web3.js";
import { Controller, ZoDepository, Zo, createAndInitializeZo } from "@uxdprotocol/uxd-client";
import { CLUSTER } from "./constants";
import { getProvider } from "./provider";

export const callIntegrationSuite = () => {
    let zo: Zo;

    beforeEach("\n", () => { console.log("=============================================\n\n") });

    it("Get zo", async () => {
        zo = await createAndInitializeZo(CLUSTER, getProvider().connection);
        console.log("state:")
        console.log(zo.state.pubkey.toString())
        console.log("program:")
        console.log(zo.program.programId.toString())
    });
}