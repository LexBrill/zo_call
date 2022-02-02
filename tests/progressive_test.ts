import { Signer } from "@solana/web3.js";
import { Controller, Zo, ZoDepository } from "@uxdprotocol/uxd-client";
import { expect } from "chai";
import { callCpiTest } from "./callCpiTest";
// import { control } from "./constants";
import { initializeControllerTest } from "./initializeControllerTest";
import { initializeZoDepositoryTest } from "./initializeZODepositoryTest";

// export async function progressiveTest(authority: Signer, controller: Controller, depository: ZoDepository, zo: Zo): Promise<string> {
export async function progressiveTest(
  authority: Signer,
  control: Signer,
  controller: Controller,
  depository: ZoDepository,
  zo: Zo
): Promise<string> {
  describe("internal runs", () => {
    it("Initialize Controller", async () => {
      await initializeControllerTest(authority, controller);
      console.log("some");
      // expect(false == true);
    });

    it("Call create margin from cpiCall", async () => {
        await callCpiTest(authority, authority, zo, control);
    });

    it("Initialize ZoDepository", async () => {
      await initializeZoDepositoryTest(authority, control, controller, depository, zo);
    });
  });
  return "hehe";
}
