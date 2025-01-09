"use client";

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux フックを使用
import { setAccounts, setSelectedAccount } from "@/redux/slices/accountSlice"; // Redux アクションをインポート
import AccountSelector from "@/components/Header/AccountSelector"; // アカウント選択用のドロップダウンコンポーネント
import { Account } from "@/schemas/accountSchemas";
import { getAllAccountsAction } from "@/server/actions"; // アカウントデータを取得するアクション

export default function Header() {
  const dispatch = useDispatch();

  // Redux ストアからアカウントの状態を取得
  const { selectedAccount } = useSelector((state: any) => state.account); // 現在選択中のアカウント
  const accounts = useSelector((state: any) => state.account.accounts); // すべてのアカウントリスト

  const [isLoading, setIsLoading] = useState(true); // ローディング状態

  // アカウントデータを取得する非同期関数
  const fetchAccounts = useCallback(async () => {
    try {
      const result = await getAllAccountsAction();
      if (result.error) {
        throw new Error(result.error);
      }

      if (result.accounts !== undefined) { // undefined でないか確認
        dispatch(setAccounts(result.accounts)); // Redux ストア内のアカウントデータを更新
      }

      // 選択されたアカウントがない場合はデフォルトで最初のアカウントを選択
      if (result.accounts !== undefined && !selectedAccount && result.accounts.length > 0) { // アカウントリストの長さを確認
        dispatch(setSelectedAccount(result.accounts[0])); // デフォルトで最初のアカウントを選択
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [dispatch, selectedAccount]);

  // コンポーネントがマウントされたときにアカウントデータを取得
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  // アカウントが変更された際に選択を更新
  const handleAccountChange = (account: Account) => {
    dispatch(setSelectedAccount(account)); // 現在選択中のアカウントを更新
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-200">
      <div className="text-lg font-bold"></div>
      
      {/* アカウントデータ、現在選択中のアカウント、アカウント変更処理関数を AccountSelector に渡す */}
      <AccountSelector
        accounts={accounts}
        currentAccount={selectedAccount}
        onChange={handleAccountChange}
      />
    </header>
  );
}