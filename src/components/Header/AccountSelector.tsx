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
      <button onClick={toggleDropdown} className="flex items-center px-4 py-2 bg-white shadow rounded">
        <svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z" />
        </svg>
        {currentAccount ? currentAccount.name : 'アカウント未選択'}
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
                  <svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z" />
                  </svg>
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