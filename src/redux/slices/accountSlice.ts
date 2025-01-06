import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/Account';

interface AccountState {
  selectedAccount: Account | null;
  accounts: Account[];
}

const initialState: AccountState = {
  selectedAccount: null,
  accounts: [],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
      if (!state.selectedAccount && state.accounts.length > 0) {
        state.selectedAccount = state.accounts[0]; // 默认选第一个账户
      }
    },
    setSelectedAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const { setAccounts, setSelectedAccount } = accountSlice.actions;

export default accountSlice.reducer;