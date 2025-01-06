"use client";

import React, { useState } from 'react';
import { Account } from '../../models/Account';

type AccountSelectorProps = {
  accounts: Account[];
  currentAccount: Account | null;
  onChange: (account: Account) => void;
};

const AccountSelector: React.FC<AccountSelectorProps> = ({ accounts, currentAccount, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAccountClick = (account: Account) => {
    onChange(account);  // 更新选中的账户
    setIsOpen(false);  // 关闭下拉框
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="bg-gray-100 px-4 py-2 rounded-md">
        <span className="text-xl">👤</span>
        {currentAccount ? currentAccount.name : '请选择账户'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
          {accounts.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">没有账户</div>
          ) : (
            accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAccountClick(account)}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">👤</span>
                  <span className="text-gray-800">{account.name}</span>
                </div>
                <span className="text-gray-500">➔</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSelector;