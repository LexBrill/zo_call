import { Cluster, Connection, PublicKey } from "@solana/web3.js";
import * as zo from "@zero_one/client";
import * as anchor from "@project-serum/anchor";
import { Cluster as ZoCluster, createProgram } from "@zero_one/client";

// export const ZO_PROGRAM_ID_DEVNET = new PublicKey('Zo1ThtSHMh9tZGECwBDL81WJRL6s3QTHf733Tyko7KQ');
// export const ZO_PROGRAM_ID_MAINNET = new PublicKey('Zo1ggzTUKMY5bYnDvT5mtVeZxzf2FaLTbKkmvGUhUQk');

const invalidClusterError = 'Invalid cluster';

// Helper to init and configure a Zo object.
export async function createAndInitializeZo(
    cluster: Cluster,
    connection: Connection, // Use connection when they update API - necessary for frontend
    // provider: anchor.Provider,
): Promise<Zo> {
    console.log(connection.commitment)
    let zoCluster;
    switch (cluster) {
        case 'devnet':
            zoCluster = zo.Cluster.Devnet;
            break;
        case 'mainnet-beta':
            zoCluster = zo.Cluster.Mainnet;
            break;
        default: {
            throw invalidClusterError;
        }
    };
    // @ts-expect-error
    const provider = new anchor.Provider(connection, null, null);

    // Setup the program
    const program = createProgram(provider, zoCluster);

    // Load the state
    const state: zo.State = await zo.State.load(program, zo.ZO_STATE_KEY);

    return new Zo(program, state);
}

export class Zo {
    public program: anchor.Program<zo.Zo>;
    public state: zo.State

    constructor(
        program: anchor.Program<zo.Zo>,
        state: zo.State,
    ) {
        this.program = program;
        this.state = state;
    }

    public async getMarginAccountPda(owner: PublicKey): Promise<[PublicKey, number]> {
        // Get the Margin account of the trader (and the Control one)
        return zo.Margin.getPda(this.state, owner, this.program.programId);
    }

    public async loadMarginAccount(owner: PublicKey): Promise<zo.Margin> {
        await this.state.refresh();
        // await this.state.cache.refresh();
        zo.Margin.load
        return zo.Margin.load(this.program, this.state, this.state.cache, owner);
    }
}