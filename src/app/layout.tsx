// src/app/layout.tsx
"use client";

import { Provider } from 'react-redux';
import { store } from '../redux/store/store';  // 导入刚刚创建的 Redux store
import Header from "../components/Header/Header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
    <html lang="ja">
      <body className={`w-full flex flex-col`}>
        <div>{children}</div>
      </body>
    </html>
    </Provider>
  );
}