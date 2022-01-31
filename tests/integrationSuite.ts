import { Signer } from "@solana/web3.js";
import { Controller, ZoDepository, Zo, createAndInitializeZo } from "@uxdprotocol/uxd-client";
import { CLUSTER } from "./constants";
import { getProvider } from "./provider";

// export class callTestSuiteParameters {
//     public globalSupplyCap: number;
//     public globalSupplyCapLow: number;
//     public zoDepositoriesRedeemableSoftCap: number;
//     public zoDepositoriesRedeemableSoftCapLow: number;
//     public slippage: number;
//     public insuranceAmount: number;

//     public constructor(
//         globalSupplyCap: number,
//         globalSupplyCapLow: number,
//         zoDepositoriesRedeemableSoftCap: number,
//         zoDepositoriesRedeemableSoftCapLow: number,
//         slippage: number,
//         insuranceAmount: number,
//     ) {
//         this.globalSupplyCap = globalSupplyCap;
//         this.globalSupplyCapLow = globalSupplyCapLow;
//         this.zoDepositoriesRedeemableSoftCap = zoDepositoriesRedeemableSoftCap;
//         this.zoDepositoriesRedeemableSoftCapLow = zoDepositoriesRedeemableSoftCapLow;
//         this.slippage = slippage;
//         this.insuranceAmount = insuranceAmount;
//     }
// }

// export const callIntegrationSuite = (authority: Signer, user: Signer, params: callTestSuiteParameters) => {
export const callIntegrationSuite = (authority: Signer, user: Signer) => {
    let zo: Zo;

    beforeEach("\n", () => { console.log("=============================================\n\n") });

    it("Get zo", async () => {
        zo = await createAndInitializeZo(CLUSTER, getProvider().connection);
    });
}