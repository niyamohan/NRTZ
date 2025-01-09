import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '@/schemas/accountSchemas';

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
        state.selectedAccount = state.accounts[0]; // 最初のアカウントを選択する
      }
    },
    setSelectedAccount: (state, action: PayloadAction<Account>) => {
      state.selectedAccount = action.payload;
    },
  },
});

export const { setAccounts, setSelectedAccount } = accountSlice.actions;

export default accountSlice.reducer;