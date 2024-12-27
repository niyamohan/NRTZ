"use client";

import React, { useState, useEffect } from "react";

// 账户类型定义
interface Account {
  id: string;
  name: string;
}

const Header: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]); // 存储账户列表
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null); // 当前账户
  const [isOpen, setIsOpen] = useState(false); // 控制下拉框显示与否

  // 从后端获取账户数据
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch("/api/accounts");
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data: Account[] = await response.json();
        setAccounts(data);

        // 默认选择第一个账户
        if (data.length > 0) {
          setCurrentAccount(data[0]);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    }

    fetchAccounts();
  }, []);

  // 切换当前账户
  const handleChangeAccount = (account: Account) => {
    setCurrentAccount(account);
    setIsOpen(false); // 关闭下拉框
  };

  return (
    <header className="bg-gray-200 shadow-md">
      <div className="container mx-auto flex justify-end items-center py-4 px-6">
        {/* 当前账户显示 */}
        <div className="relative">
          <button
            className="flex items-center bg-gray-100 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="mr-2">👤</span>
            {currentAccount ? currentAccount.name : "加载中..."}
          </button>

          {/* 下拉选择框 */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-10">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleChangeAccount(account)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">👤</span>
                    <span className="text-gray-800">{account.name}</span>
                  </div>
                  <span className="text-gray-500">➔</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;