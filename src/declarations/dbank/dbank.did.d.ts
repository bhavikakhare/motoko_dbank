import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalance' : () => Promise<number>,
  'compound' : () => Promise<undefined>,
  'getInterestRate' : () => Promise<number>,
  'reset_balance' : (arg_0: number) => Promise<undefined>,
  'reset_interest' : (arg_0: number) => Promise<undefined>,
  'topUp' : (arg_0: number) => Promise<undefined>,
  'withdraw' : (arg_0: number) => Promise<undefined>,
}
