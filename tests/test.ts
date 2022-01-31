import { Zo, createAndInitializeZo } from "@uxdprotocol/uxd-client";
import * as anchor from "@project-serum/anchor";
import { CLUSTER } from "./constants";
import { getProvider } from "./provider";
// import { Keypair, PublicKey } from "@solana/web3.js";
import { createProgram, Cluster, State, Margin } from "@zero_one/client";
// const user = new Keypair();

// console.log("USER =>", user.publicKey.toString());

describe("Test", () => {
    let zo: Zo;
    it("Get zo: uxd-client", async () => {
        zo = await createAndInitializeZo(CLUSTER, getProvider().connection);
        // console.log("state:")
        // console.log(zo.state.pubkey.toString())
        console.log("program from uxd-client:")
        console.log(zo.program.programId.toString())
    });

    it("Get zo: 01-client", async () => {
        const provider = anchor.Provider.local("https://api.devnet.solana.com");

        const program = createProgram(provider, Cluster.Devnet);

        // let stateKey = new PublicKey("KwcWW7WvgSXLJcyjKZJBHLbfriErggzYHpjS9qjVD5F");

        // const state: State = await State.load(program, stateKey);

        // const margin: Margin = await Margin.create(program, state);

        // const MARKET_SYMBOL = "BTC-PERP";

        // await margin.createPerpOpenOrders(MARKET_SYMBOL);

        console.log("program from 01-client:");
        console.log(program.programId.toString());

    });


});

