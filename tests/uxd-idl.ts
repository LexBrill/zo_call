export type UxdIdl = {
  version: "2.1.0";
  name: "uxd";
  instructions: [
    {
        "name": "callCpi",
        "accounts": [
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "payer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "state",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "marginAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "control",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "zoProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "marginNonce",
            "type": "u8"
          }
        ]
      },
    {
      name: "setUp";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "control";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "registerZoDepository";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "controller";
          isMut: true;
          isSigner: false;
        },
        {
          name: "depository";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collateralMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "insuranceMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "depositoryZoAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "zoState";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoControl";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "zoProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "bump";
          type: "u8";
        },
        {
          name: "zoAccountBump";
          type: "u8";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "controller";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "redeemableMintBump";
            type: "u8";
          },
          {
            name: "version";
            type: "u8";
          },
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "redeemableMint";
            type: "publicKey";
          },
          {
            name: "redeemableMintDecimals";
            type: "u8";
          },
          {
            name: "registeredMangoDepositories";
            type: {
              array: ["publicKey", 8];
            };
          },
          {
            name: "registeredMangoDepositoriesCount";
            type: "u8";
          },
          {
            name: "redeemableGlobalSupplyCap";
            type: "u128";
          },
          {
            name: "mangoDepositoriesRedeemableSoftCap";
            type: "u64";
          },
          {
            name: "redeemableCirculatingSupply";
            type: "u128";
          },
          {
            name: "registeredZoDepositories";
            type: {
              array: ["publicKey", 8];
            };
          },
          {
            name: "registeredZoDepositoriesCount";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "zoDepository";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "zoAccountBump";
            type: "u8";
          },
          {
            name: "version";
            type: "u8";
          },
          {
            name: "collateralMint";
            type: "publicKey";
          },
          {
            name: "collateralMintDecimals";
            type: "u8";
          },
          {
            name: "insuranceMint";
            type: "publicKey";
          },
          {
            name: "insuranceMintDecimals";
            type: "u8";
          },
          {
            name: "zoAccount";
            type: "publicKey";
          },
          {
            name: "controller";
            type: "publicKey";
          },
          {
            name: "insuranceAmountDeposited";
            type: "u128";
          },
          {
            name: "collateralAmountDeposited";
            type: "u128";
          },
          {
            name: "redeemableAmountUnderManagement";
            type: "u128";
          },
          {
            name: "totalAmountPaidTakerFee";
            type: "u128";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "SourceFileId";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Error";
          },
          {
            name: "Lib";
          },
          {
            name: "StateZoDepository";
          },
          {
            name: "InstructionsRegisterZoDepository";
          },
        ];
      };
    },
    {
      name: "UxdError";
      type: {
        kind: "enum";
        variants: [
          {
            name: "ProgramError";
            fields: [
              {
                defined: "ProgramError";
              }
            ];
          },
          {
            name: "UxdErrorCode";
            fields: [
              {
                name: "uxd_error_code";
                type: {
                  defined: "UxdErrorCode";
                };
              },
              {
                name: "line";
                type: "u32";
              },
              {
                name: "source_file_id";
                type: {
                  defined: "SourceFileId";
                };
              }
            ];
          }
        ];
      };
    },
    {
      name: "UxdErrorCode";
      type: {
        kind: "enum";
        variants: [
          {
            name: "InvalidRedeemableMintDecimals";
          },
          {
            name: "InvalidRedeemableGlobalSupplyCap";
          },
          {
            name: "RootBankIndexNotFound";
          },
          {
            name: "InvalidSlippage";
          },
          {
            name: "InvalidCollateralAmount";
          },
          {
            name: "InsufficientCollateralAmount";
          },
          {
            name: "InvalidRedeemableAmount";
          },
          {
            name: "InsufficientRedeemableAmount";
          },
          {
            name: "PerpOrderPartiallyFilled";
          },
          {
            name: "RedeemableGlobalSupplyCapReached";
          },
          {
            name: "MangoDepositoriesSoftCapOverflow";
          },
          {
            name: "MaxNumberOfMangoDepositoriesRegisteredReached";
          },
          {
            name: "InvalidInsuranceAmount";
          },
          {
            name: "InsufficientAuthorityInsuranceAmount";
          },
          {
            name: "InvalidRebalancedAmount";
          },
          {
            name: "InsufficientOrderBookDepth";
          },
          {
            name: "InvalidExecutedOrderSize";
          },
          {
            name: "MangoPerpMarketIndexNotFound";
          },
          {
            name: "InvalidMangoDepositoriesRedeemableSoftCap";
          },
          {
            name: "InvalidQuoteLotDelta";
          },
          {
            name: "InvalidOrderDirection";
          },
          {
            name: "MathError";
          },
          {
            name: "MaxNumberOfZoDepositoriesRegisteredReached";
          },
          {
            name: "Default";
          }
        ];
      };
    },
    {
      name: "AccountingEvent";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Deposit";
          },
          {
            name: "Withdraw";
          }
        ];
      };
    },
    {
      name: "AccountingEvent";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Deposit";
          },
          {
            name: "Withdraw";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "InitializeControllerEvent";
      fields: [
        {
          name: "version";
          type: "u8";
          index: false;
        },
        {
          name: "controller";
          type: "publicKey";
          index: false;
        },
        {
          name: "authority";
          type: "publicKey";
          index: false;
        }
      ];
    },
    {
      name: "RegisterZoDepositoryEvent";
      fields: [
        {
          name: "version";
          type: "u8";
          index: false;
        },
        {
          name: "controller";
          type: "publicKey";
          index: false;
        },
        {
          name: "depository";
          type: "publicKey";
          index: false;
        },
        {
          name: "collateralMint";
          type: "publicKey";
          index: false;
        },
        {
          name: "insuranceMint";
          type: "publicKey";
          index: false;
        },
        {
          name: "zoAccount";
          type: "publicKey";
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidAuthority";
      msg: "Only the Program initializer authority can access this instructions.";
    },
    {
      code: 6001;
      name: "InvalidController";
      msg: "The Depository's controller doesn't match the provided Controller.";
    },
    {
      code: 6002;
      name: "InvalidDepository";
      msg: "The Depository provided is not registered with the Controller.";
    },
    {
      code: 6003;
      name: "InvalidCollateralMint";
      msg: "The provided collateral mint does not match the depository's collateral mint.";
    },
    {
      code: 6004;
      name: "InvalidInsuranceMint";
      msg: "The provided insurance mint does not match the depository's insurance mint.";
    },
    {
      code: 6005;
      name: "InvalidAuthorityInsuranceATAMint";
      msg: "The authority's Insurance ATA's mint does not match the Depository's one.";
    },
    {
      code: 6006;
      name: "InvalidCollateralPassthroughAccount";
      msg: "The Collateral Passthrough Account isn't the Depository one.";
    },
    {
      code: 6007;
      name: "InvalidInsurancePassthroughAccount";
      msg: "The Insurance Passthrough Account isn't the Depository one.";
    },
    {
      code: 6008;
      name: "InvalidMangoAccount";
      msg: "The Mango Account isn't the Depository one.";
    },
    {
      code: 6009;
      name: "InvalidInsurancePassthroughATAMint";
      msg: "The Insurance Passthrough ATA's mint does not match the Depository's one.";
    },
    {
      code: 6010;
      name: "InvalidRedeemableMint";
      msg: "The Redeemable Mint provided does not match the Controller's one.";
    },
    {
      code: 6011;
      name: "InvalidCollateralPassthroughATAMint";
      msg: "The Collateral Passthrough ATA's mint does not match the Depository's one.";
    }
  ];
};

export const uxdIdl: UxdIdl = {
  version: "2.1.0",
  name: "uxd",
  instructions: [
    {
        "name": "callCpi",
        "accounts": [
          {
            "name": "authority",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "payer",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "state",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "marginAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "control",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "zoProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "marginNonce",
            "type": "u8"
          }
        ]
      },
    {
      name: "setUp",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "control",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "registerZoDepository",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "controller",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depository",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collateralMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "insuranceMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "depositoryZoAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "zoState",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoControl",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "zoProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "bump",
          type: "u8",
        },
        {
          name: "zoAccountBump",
          type: "u8",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "controller",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "redeemableMintBump",
            type: "u8",
          },
          {
            name: "version",
            type: "u8",
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "redeemableMint",
            type: "publicKey",
          },
          {
            name: "redeemableMintDecimals",
            type: "u8",
          },
          {
            name: "registeredMangoDepositories",
            type: {
              array: ["publicKey", 8],
            },
          },
          {
            name: "registeredMangoDepositoriesCount",
            type: "u8",
          },
          {
            name: "redeemableGlobalSupplyCap",
            type: "u128",
          },
          {
            name: "mangoDepositoriesRedeemableSoftCap",
            type: "u64",
          },
          {
            name: "redeemableCirculatingSupply",
            type: "u128",
          },
          {
            name: "registeredZoDepositories",
            type: {
              array: ["publicKey", 8],
            },
          },
          {
            name: "registeredZoDepositoriesCount",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "zoDepository",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "zoAccountBump",
            type: "u8",
          },
          {
            name: "version",
            type: "u8",
          },
          {
            name: "collateralMint",
            type: "publicKey",
          },
          {
            name: "collateralMintDecimals",
            type: "u8",
          },
          {
            name: "insuranceMint",
            type: "publicKey",
          },
          {
            name: "insuranceMintDecimals",
            type: "u8",
          },
          {
            name: "zoAccount",
            type: "publicKey",
          },
          {
            name: "controller",
            type: "publicKey",
          },
          {
            name: "insuranceAmountDeposited",
            type: "u128",
          },
          {
            name: "collateralAmountDeposited",
            type: "u128",
          },
          {
            name: "redeemableAmountUnderManagement",
            type: "u128",
          },
          {
            name: "totalAmountPaidTakerFee",
            type: "u128",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "SourceFileId",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Error",
          },
          {
            name: "Lib",
          },
          {
            name: "StateZoDepository",
          },
          {
            name: "InstructionsRegisterZoDepository",
          },
        ],
      },
    },
    {
      name: "UxdError",
      type: {
        kind: "enum",
        variants: [
          {
            name: "ProgramError",
            fields: [
              {
                defined: "ProgramError",
              },
            ],
          },
          {
            name: "UxdErrorCode",
            fields: [
              {
                name: "uxd_error_code",
                type: {
                  defined: "UxdErrorCode",
                },
              },
              {
                name: "line",
                type: "u32",
              },
              {
                name: "source_file_id",
                type: {
                  defined: "SourceFileId",
                },
              },
            ],
          },
        ],
      },
    },
    {
      name: "UxdErrorCode",
      type: {
        kind: "enum",
        variants: [
          {
            name: "InvalidRedeemableMintDecimals",
          },
          {
            name: "InvalidRedeemableGlobalSupplyCap",
          },
          {
            name: "RootBankIndexNotFound",
          },
          {
            name: "InvalidSlippage",
          },
          {
            name: "InvalidCollateralAmount",
          },
          {
            name: "InsufficientCollateralAmount",
          },
          {
            name: "InvalidRedeemableAmount",
          },
          {
            name: "InsufficientRedeemableAmount",
          },
          {
            name: "PerpOrderPartiallyFilled",
          },
          {
            name: "RedeemableGlobalSupplyCapReached",
          },
          {
            name: "MangoDepositoriesSoftCapOverflow",
          },
          {
            name: "MaxNumberOfMangoDepositoriesRegisteredReached",
          },
          {
            name: "InvalidInsuranceAmount",
          },
          {
            name: "InsufficientAuthorityInsuranceAmount",
          },
          {
            name: "InvalidRebalancedAmount",
          },
          {
            name: "InsufficientOrderBookDepth",
          },
          {
            name: "InvalidExecutedOrderSize",
          },
          {
            name: "MangoPerpMarketIndexNotFound",
          },
          {
            name: "InvalidMangoDepositoriesRedeemableSoftCap",
          },
          {
            name: "InvalidQuoteLotDelta",
          },
          {
            name: "InvalidOrderDirection",
          },
          {
            name: "MathError",
          },
          {
            name: "MaxNumberOfZoDepositoriesRegisteredReached",
          },
          {
            name: "Default",
          },
        ],
      },
    },
    {
      name: "AccountingEvent",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Deposit",
          },
          {
            name: "Withdraw",
          },
        ],
      },
    },
    {
      name: "AccountingEvent",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Deposit",
          },
          {
            name: "Withdraw",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "InitializeControllerEvent",
      fields: [
        {
          name: "version",
          type: "u8",
          index: false,
        },
        {
          name: "controller",
          type: "publicKey",
          index: false,
        },
        {
          name: "authority",
          type: "publicKey",
          index: false,
        },
      ],
    },
    {
      name: "RegisterZoDepositoryEvent",
      fields: [
        {
          name: "version",
          type: "u8",
          index: false,
        },
        {
          name: "controller",
          type: "publicKey",
          index: false,
        },
        {
          name: "depository",
          type: "publicKey",
          index: false,
        },
        {
          name: "collateralMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "insuranceMint",
          type: "publicKey",
          index: false,
        },
        {
          name: "zoAccount",
          type: "publicKey",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidAuthority",
      msg: "Only the Program initializer authority can access this instructions.",
    },
    {
      code: 6001,
      name: "InvalidController",
      msg: "The Depository's controller doesn't match the provided Controller.",
    },
    {
      code: 6002,
      name: "InvalidDepository",
      msg: "The Depository provided is not registered with the Controller.",
    },
    {
      code: 6003,
      name: "InvalidCollateralMint",
      msg: "The provided collateral mint does not match the depository's collateral mint.",
    },
    {
      code: 6004,
      name: "InvalidInsuranceMint",
      msg: "The provided insurance mint does not match the depository's insurance mint.",
    },
    {
      code: 6005,
      name: "InvalidAuthorityInsuranceATAMint",
      msg: "The authority's Insurance ATA's mint does not match the Depository's one.",
    },
    {
      code: 6006,
      name: "InvalidCollateralPassthroughAccount",
      msg: "The Collateral Passthrough Account isn't the Depository one.",
    },
    {
      code: 6007,
      name: "InvalidInsurancePassthroughAccount",
      msg: "The Insurance Passthrough Account isn't the Depository one.",
    },
    {
      code: 6008,
      name: "InvalidMangoAccount",
      msg: "The Mango Account isn't the Depository one.",
    },
    {
      code: 6009,
      name: "InvalidInsurancePassthroughATAMint",
      msg: "The Insurance Passthrough ATA's mint does not match the Depository's one.",
    },
    {
      code: 6010,
      name: "InvalidRedeemableMint",
      msg: "The Redeemable Mint provided does not match the Controller's one.",
    },
    {
      code: 6011,
      name: "InvalidCollateralPassthroughATAMint",
      msg: "The Collateral Passthrough ATA's mint does not match the Depository's one.",
    },
  ],
};
