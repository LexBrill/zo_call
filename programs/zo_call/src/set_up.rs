use anchor_lang::prelude::*;
use anchor_spl::token::Mint;
use anchor_spl::token::Token;
use zo_abi::{self as zo, program::ZoAbi as Zo};

const ZO_CONTROL_SPAN: usize = 8 + 4482;

#[derive(Accounts)]
pub struct ZoControlPass<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        owner = zo_abi::ID,
        payer = signer,
        space = ZO_CONTROL_SPAN,
    )]
    pub control: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
pub fn handler(
    ctx: Context<ZoControlPass>,
) -> ProgramResult {
    Ok(())
}