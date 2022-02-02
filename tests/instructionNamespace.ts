import { Coder, Idl, InstructionNamespace } from '@project-serum/anchor';
import InstructionNamespaceFactory from '@project-serum/anchor/dist/cjs/program/namespace/instruction';
import { AllInstructions } from '@project-serum/anchor/dist/cjs/program/namespace/types';
import { PublicKey } from '@solana/web3.js';
import camelcase from "camelcase";
import { UxdIdl } from './uxd-idl';

export default class NamespaceFactory {
  public static buildInstructionNamespace<IDL extends Idl>(
    idl: UxdIdl,
    programId: PublicKey
  ): InstructionNamespace<IDL> {
    const instruction: InstructionNamespace = {};

    idl.instructions.forEach(<I extends AllInstructions<IDL>>(idlIx: I) => {
      const ixItem = InstructionNamespaceFactory.build<IDL, I>(
        idlIx,
        (ixName, ix) => new Coder(idl).instruction.encode(ixName, ix),
        programId
      );
      const name = camelcase(idlIx.name);
      // @ts-expect-error
      instruction[name] = ixItem;
    });

    return instruction as InstructionNamespace<IDL>;
  }
}
