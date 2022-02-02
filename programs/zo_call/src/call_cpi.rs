use anchor_lang::prelude::*;
use anchor_spl::token::Mint;
use anchor_spl::token::Token;
use zo_abi::{self as zo, program::ZoAbi as Zo};

#[derive(Accounts)]
#[instruction(
    margin_nonce: u8,
)]
pub struct CallZo<'info> {
    pub authority: Signer<'info>,
    // payer?
    pub payer: Signer<'info>,
    // pub collateral_mint: Box<Account<'info, Mint>>,

    // ZO CPI
    pub state: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [authority.key.as_ref(), state.key().as_ref(), b"marginv1".as_ref()],
        bump = margin_nonce,
    )]
    pub margin_account: AccountInfo<'info>, //what is this?
    #[account(zero)]
    pub control: AccountInfo<'info>,
    // programs
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub zo_program: Program<'info, Zo>,
    // sysvar
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(
    ctx: Context<CallZo>,
    margin_nonce: u8,
) -> ProgramResult {
    zo::cpi::create_margin(
        ctx.accounts.into_zo_create_margin_context(),
        margin_nonce,
    )?;

    Ok(())
}

impl<'info> CallZo<'info> {
    pub fn into_zo_create_margin_context(&self) -> CpiContext<'_, '_, '_, 'info, zo::cpi::accounts::CreateMargin<'info>> {
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
