"use client";

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // 使用 Redux hooks
import { setAccounts, setSelectedAccount } from '../../redux/slices/accountSlice';  // 引入 Redux actions
import AccountSelector from '../Header/AccountSelector';  // 假设这是选择账户的下拉组件
import { Account } from '../../models/Account';

export default function Header() {
  const dispatch = useDispatch();
  const { selectedAccount } = useSelector((state: any) => state.account);  // 从 Redux 获取当前选中的账户
  const accounts = useSelector((state: any) => state.account.accounts);  // 从 Redux 获取所有账户
  const [isLoading, setIsLoading] = useState(true);  // 加载状态

  // 获取账户的异步函数
  const fetchAccounts = useCallback(async () => {
    try {
      const response = await fetch('/api/accounts/getAccounts');
      const data = await response.json();
      dispatch(setAccounts(data));  // 更新 Redux store 中的账户数据

      // 如果没有选中的账户，则默认选中第一个账户
      if (!selectedAccount && data.length > 0) {
        dispatch(setSelectedAccount(data[0]));  // 默认选中第一个账户
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setIsLoading(false);
    }
  }, [dispatch, selectedAccount]);

  useEffect(() => {
    fetchAccounts();  // 当组件挂载时获取账户数据
  }, [fetchAccounts]);

  // 当账户变化时，更新选中的账户
  const handleAccountChange = (account: Account) => {
    dispatch(setSelectedAccount(account));  // 更新当前选中的账户
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-200">
      <div className="text-lg font-bold"></div>
      
      {/* 传递账户数据、当前选中的账户、以及账户变更处理函数给 AccountSelector */}
      <AccountSelector
        accounts={accounts}
        currentAccount={selectedAccount}
        onChange={handleAccountChange}
      />
    </header>
  );
}