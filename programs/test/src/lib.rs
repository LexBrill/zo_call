use anchor_lang::prelude::*;
use anchor_spl::token::Token;
use zo_abi::{self as zo, program::ZoAbi as Zo};

declare_id!("69iaBnrPvLzRnoUm3hyXtowXaGshTtGuBTZtzBu7AWcY");

#[program]
#[deny(unused_must_use)]
pub mod test {

    use super::*;
    pub fn call_cpi(ctx: Context<CallZo>, margin_nonce: u8) -> ProgramResult {
        let state_key = ctx.accounts.state.key.as_ref();

        let margin_account_signer_seed: &[&[&[u8]]] = &[&[
            ctx.accounts.authority.key.as_ref(),
            state_key,
            b"marginv1".as_ref(),
            &[margin_nonce],
        ]];

        zo::cpi::create_margin(
            ctx.accounts
                .into_zo_create_margin_context()
                .with_signer(margin_account_signer_seed),
            margin_nonce,
        )?;

        Ok(())
    }
}

impl<'info> CallZo<'info> {
    pub fn into_zo_create_margin_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, zo::cpi::accounts::CreateMargin<'info>> {
        let cpi_accounts = zo::cpi::accounts::CreateMargin {
            state: self.state.to_account_info(),
            authority: self.authority.to_account_info(),
            payer: self.payer.to_account_info(),
            margin: self.margin_account.to_account_info(),
            control: self.control.to_account_info(),
            rent: self.rent.to_account_info(),
            system_program: self.system_program.to_account_info(),
        };
        let cpi_program = self.zo_program.to_account_info();
        CpiContext::new(cpi_program, cpi_accounts)
    }
}

#[derive(Accounts)]
#[instruction(
    margin_nonce: u8,
)]
pub struct CallZo<'info> {
    pub authority: Signer<'info>,
    // payer?
    #[account(mut)]
    pub payer: Signer<'info>,
    // pub collateral_mint: Box<Account<'info, Mint>>,

    // ZO CPI
    pub state: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [authority.key.as_ref(), state.key().as_ref(), b"marginv1".as_ref()],
        bump = margin_nonce,
        // space = 1000,
        // payer = payer,
    )]
    pub margin_account: AccountInfo<'info>,
    #[account(zero)]
    pub control: AccountInfo<'info>,
    // programs
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub zo_program: Program<'info, Zo>,
    // sysvar
    pub rent: Sysvar<'info, Rent>,
}
