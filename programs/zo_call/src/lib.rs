use anchor_lang::prelude::*;

pub mod call_cpi;
pub mod set_up;
pub use call_cpi::*;
pub use set_up::*;
declare_id!("D7hKgQLsJWsvtK2SLp7uw3L26hYQg2eRs6F6m7HBfvtY");

#[program]
#[deny(unused_must_use)]
pub mod zo_call {

    use super::*;
    pub fn call_cpi(
        ctx: Context<CallZo>,
        margin_nonce: u8,
    ) -> ProgramResult {
        msg!("Here!");
        call_cpi::handler(
            ctx,
            margin_nonce,
        )?;
        Ok(())
    }

    pub fn set_up(
        ctx: Context<ZoControlPass>,
    ) -> ProgramResult {
        msg!("Set up");
        set_up::handler(
            ctx,
        )?;
        Ok(())
    }

}
