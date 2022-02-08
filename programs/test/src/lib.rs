use anchor_lang::prelude::*;
use anchor_spl::token::Mint;
use anchor_spl::token::Token;

// use crate::ZoDepository;
use zo_abi::{self as zo, program::ZoAbi as Zo};

declare_id!("CE9tXwmJVSyaQprBXbDDqZ9AbNkEf8Rnf1sTJzLPpj9L");

pub const ZO_DEPOSITORY_NAMESPACE: &[u8] = b"ZODEPOSITORY";

#[program]
#[deny(unused_must_use)]
pub mod test {

    use super::*;
    pub fn call_cpi(ctx: Context<CallZo>, pda_bump: u8, margin_nonce: u8) -> ProgramResult {
        // let state_key = ctx.accounts.state.key.as_ref();

        // let margin_account_signer_seed: &[&[&[u8]]] = &[&[
        //     ctx.accounts.authority.key.as_ref(),
        //     state_key,
        //     b"marginv1".as_ref(),
        //     &[margin_nonce],
        // ]];

        let collateral_mint = ctx.accounts.collateral_mint.key();

        let depository_signer_seed: &[&[&[u8]]] = &[&[
            ZO_DEPOSITORY_NAMESPACE,
            collateral_mint.as_ref(),
            &[pda_bump]
        ]];

        zo::cpi::create_margin(
            ctx.accounts
                .into_zo_create_margin_context()
                .with_signer(depository_signer_seed),
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
            authority: self.depository.to_account_info(),
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
    pda_bump: u8,
    margin_nonce: u8,
)]
pub struct CallZo<'info> {
    pub authority: Signer<'info>,
    // payer?
    #[account(mut)]
    pub payer: Signer<'info>,
    // pub collateral_mint: Box<Account<'info, Mint>>,
    #[account(
        init,
        seeds = [ZO_DEPOSITORY_NAMESPACE, collateral_mint.key().as_ref()],
        bump = pda_bump,
        payer = payer,
    )]
    pub depository: Box<Account<'info, ZoDepository>>,
    // pub depository: AccountInfo<'info>,
    pub collateral_mint: Box<Account<'info, Mint>>,
    pub insurance_mint: Box<Account<'info, Mint>>,
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


#[account]
#[derive(Default)]
pub struct ZoDepository {
    pub bump: u8,
// pub collateral_passthrough_bump: u8,
// pub insurance_passthrough_bump: u8,
    pub zo_account_bump: u8,
    // Version used - for migrations later if needed
    pub version: u8,
    pub collateral_mint: Pubkey,
    pub collateral_mint_decimals: u8,
// pub collateral_passthrough: Pubkey,
    pub insurance_mint: Pubkey,
// pub insurance_passthrough: Pubkey,
    pub insurance_mint_decimals: u8,
    pub zo_account: Pubkey,
    //
    // The Controller instance for which this Depository works for
    pub controller: Pubkey,
    //
    // Accounting -------------------------------
    // Note : To keep track of the in and out of a depository
    //
    // The amount of USDC InsuranceFund deposited/withdrawn by Authority on the underlying ZO Account - The actual amount might be lower/higher depending of funding rate changes
    // In Collateral native units
    pub insurance_amount_deposited: u128,
    //
    // The amount of collateral deposited by users to mint UXD
    // Updated after each mint/redeem
    // In Collateral native units
    pub collateral_amount_deposited: u128,
    //
    // The amount of delta neutral position that is backing circulating redeemable.
    // Updated after each mint/redeem
    // In Redeemable native units
    pub redeemable_amount_under_management: u128,
    //
    // The amount of taker fee paid in quote while placing perp orders
    pub total_amount_paid_taker_fee: u128,
    //
    pub _reserved: ZoDepositoryPadding,
}

#[derive(Clone)]
pub struct ZoDepositoryPadding([u8; 512]);

impl AnchorSerialize for ZoDepositoryPadding {
    fn serialize<W: std::io::Write>(&self, writer: &mut W) -> std::io::Result<()> {
        writer.write_all(&self.0)
    }
}

impl AnchorDeserialize for ZoDepositoryPadding {
    fn deserialize(_: &mut &[u8]) -> Result<Self, std::io::Error> {
        Ok(Self([0u8; 512]))
    }
}

impl Default for ZoDepositoryPadding {
    fn default() -> Self {
        ZoDepositoryPadding { 0: [0u8; 512] }
    }
}

pub enum AccountingEvent {
    Deposit,
    Withdraw,
}

// impl ZoDepository {
//     pub fn update_insurance_amount_deposited(
//         &mut self,
//         event_type: &AccountingEvent,
//         amount: u64,
//     ) -> ProgramResult {
//         self.insurance_amount_deposited = match event_type {
//             AccountingEvent::Deposit => self
//                 .insurance_amount_deposited
//                 .checked_add(amount.into())
//                 .ok_or(math_err!())?,
//             AccountingEvent::Withdraw => self
//                 .insurance_amount_deposited
//                 .checked_sub(amount.into())
//                 .ok_or(math_err!())?,
//         };
//         Ok(())
//     }

//     pub fn update_collateral_amount_deposited(
//         &mut self,
//         event_type: &AccountingEvent,
//         amount: u64,
//     ) -> UxdResult {
//         self.collateral_amount_deposited = match event_type {
//             AccountingEvent::Deposit => self
//                 .collateral_amount_deposited
//                 .checked_add(amount.into())
//                 .ok_or(math_err!())?,
//             AccountingEvent::Withdraw => self
//                 .collateral_amount_deposited
//                 .checked_sub(amount.into())
//                 .ok_or(math_err!())?,
//         };
//         Ok(())
//     }

//     pub fn update_redeemable_amount_under_management(
//         &mut self,
//         event_type: &AccountingEvent,
//         amount: u64,
//     ) -> UxdResult {
//         self.redeemable_amount_under_management = match event_type {
//             AccountingEvent::Deposit => self
//                 .redeemable_amount_under_management
//                 .checked_add(amount.into())
//                 .ok_or(math_err!())?,
//             AccountingEvent::Withdraw => self
//                 .redeemable_amount_under_management
//                 .checked_sub(amount.into())
//                 .ok_or(math_err!())?,
//         };
//         Ok(())
//     }

//     pub fn update_total_amount_paid_taker_fee(&mut self, amount: u64) -> UxdResult {
//         self.total_amount_paid_taker_fee = self
//             .total_amount_paid_taker_fee
//             .checked_add(amount.into())
//             .ok_or(math_err!())?;
//         Ok(())
//     }
// }
