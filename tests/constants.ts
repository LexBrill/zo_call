import { Keypair, PublicKey, Signer } from "@solana/web3.js";
import { UXD, UXDHelpers, USDC_DECIMALS } from "@uxdprotocol/uxd-client";
// import * as jsonIdl from "../target/idl/uxd.json";

// TESTING wallets for convenience (The user and admin). To remove when going open source

// aca3VWxwBeu8FTZowJ9hfSKGzntjX68EXh1N9xpE1PC
const aca3VWSeed = Uint8Array.from([
    197, 246, 88, 131, 17, 216, 175, 8, 72, 13, 40, 236, 135, 104, 59, 108, 17, 106, 164, 234, 46, 136, 171, 148, 111,
    176, 32, 136, 59, 253, 224, 247, 8, 156, 98, 175, 196, 123, 178, 151, 182, 220, 253, 138, 191, 233, 135, 182, 173,
    175, 33, 68, 162, 191, 254, 166, 133, 219, 8, 10, 17, 154, 146, 223,
]);
// Eyh77zP5b7arPtPgpnCT8vsGmq9p5Z9HHnBSeQLnAFQi
const Eyh77Seed = Uint8Array.from([
    219, 139, 131, 236, 34, 125, 165, 13, 18, 248, 93, 160, 73, 236, 214, 251, 179, 235, 124, 126, 56, 47, 222, 28, 166,
    239, 130, 126, 66, 127, 26, 187, 207, 173, 205, 133, 48, 102, 2, 219, 20, 234, 72, 102, 53, 122, 175, 166, 198, 11,
    198, 248, 59, 40, 137, 208, 193, 138, 197, 171, 147, 124, 212, 175,
]);
// EnBKMCRrqBM3u9Zf8aWkGaNMEQHBy13rr1AsUB2ckWBy
const EnBKMCRSeed = Uint8Array.from([
    197,21,6,129,166,167,15,66,71,20,22,7,112,164,118,148,54,112,17,131,99,8,244,32,225,90,187,133,255,233,169,116,204,186,187,46,217,164,2,106,154,163,247,142,140,192,100,244,53,13,151,244,116,207,1,88,249,131,3,44,161,217,145,24
]);

// Identities - both of these are wallets that exists on devnet, we clone them each time and init from the privatekey
// This is us, the UXD deployment admins // aca3VWxwBeu8FTZowJ9hfSKGzntjX68EXh1N9xpE1PC
const adminKeypair = Keypair.fromSecretKey(aca3VWSeed);
export const authority: Signer = adminKeypair;
console.log(`CONTROLLER AUTHORITY KEY => ${authority.publicKey}`);
// This is the user //
const bankKeypair = Keypair.fromSecretKey(Eyh77Seed);
export const bank: Signer = bankKeypair;
console.log(`BANK KEY => ${bank.publicKey}`);

export const controlKeypair = Keypair.fromSecretKey(EnBKMCRSeed);
export const control: Signer = controlKeypair;
console.log(`CONTROL KEY => ${control.publicKey}`);

// Get this from anchor.toml TODO
export const CLUSTER = 'devnet'; // "mainnet"

// Swap these depending of CLUSTER TODO
export const WSOL = new PublicKey("So11111111111111111111111111111111111111112");
// Devnet
export const USDC = new PublicKey("8FRFC6MoGGkMFQwngccyu69VnYbzykGeez7ignHVAFSN");
export const BTC = new PublicKey("3UNBZ6o52WTWwjac2kPUb4FyodhU1vFkRJheu1Sh2TvU");
export const ETH = new PublicKey("Cu84KB3tDL6SbFgToHMLYVDJJXdJjenNzSKikeAvzmkA");

// Mainnet 
// export const USDC = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
// export const BTC = new PublicKey("9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E");

// ----------------------------------------------------------------------------
// export const uxdProgramId: PublicKey = new PublicKey(jsonIdl["metadata"]["address"]);
export const uxdProgramId: PublicKey = new PublicKey("FDevGi65gQoi1Lzxgy1iZDvnMsQBWbdnbYMa59m2LdkM");
export const testerProgramId: PublicKey = new PublicKey("EG8y9tRQa4bWeN2dutdt2omibyTWvBtAoiPuRecXHG2Y");
// console.debug(`UXD PROGRAM ID == ${uxdProgramId}`);
// export const uxdClient = new UXD(uxdProgramId);
export const uxdHelpers = new UXDHelpers();

export const mangoCrankInterval = 3000; // In milliseconds - Run KEEPER else useless - ~1000 on mainnet
export const slippageBase = 1000;

export const MANGO_QUOTE_DECIMALS = USDC_DECIMALS;