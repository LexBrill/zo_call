import { Zo, createAndInitializeZo, UXD_DECIMALS, SOL_DECIMALS, USDC_DECIMALS, Controller, ZoDepository } from "@uxdprotocol/uxd-client";
import * as anchor from "@project-serum/anchor";
import { authority, bank, CLUSTER, uxdProgramId, WSOL, USDC, control, controlKeypair } from "./constants";
import { getProvider } from "./provider";
import { Keypair, PublicKey } from "@solana/web3.js";
import { createProgram, Cluster, State, Margin } from "@zero_one/client";
import { progressiveTest } from "./progressive_test";
import { createControlTest } from "./createControlTest";

// console.log("USER =>", user.publicKey.toString());

const user = new Keypair();
const controllerUXD = new Controller("UXD", UXD_DECIMALS, uxdProgramId);
const zoDepositorySOL = new ZoDepository(WSOL, "SOL", SOL_DECIMALS, USDC, "USDC", USDC_DECIMALS, uxdProgramId);

describe("Test", () => {
    before("Transfer 20 sol from bank to test user", async () => {
        const transaction = new anchor.web3.Transaction().add(
            anchor.web3.SystemProgram.transfer({
                fromPubkey: bank.publicKey,
                toPubkey: user.publicKey,
                lamports: anchor.web3.LAMPORTS_PER_SOL * 20
            }),
        );
        await anchor.web3.sendAndConfirmTransaction(getProvider().connection, transaction, [
            bank,
        ]);
    });

    let zo: Zo;
    it("Get zo: uxd-client", async () => {
        zo = await createAndInitializeZo(CLUSTER, getProvider().connection);
        // console.log("state:")
        // console.log(zo.state.pubkey.toString())
        console.log("program from uxd-client:")
        console.log(zo.program.programId.toString())
        try {
            if (await getProvider().connection.getAccountInfo(controlKeypair.publicKey)) {
                console.log("Already registered.");
            } else {
                await createControlTest(authority, controlKeypair);
            }
        } catch (error) {
            throw error;
        }
        // const control = new Keypair();
        
        await progressiveTest(authority, control, controllerUXD, zoDepositorySOL, zo);
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

