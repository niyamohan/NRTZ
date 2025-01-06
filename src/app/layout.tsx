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
      <html lang="en">
        <head>
          <title>My App</title>
          <meta name="description" content="Account Management App" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="min-h-screen flex flex-col bg-gray-100">
          <Header />
          <main className="flex-1 container mx-auto p-4">{children}</main>
          <footer className="bg-gray-800 text-white p-4 mt-4">
            <div className="container mx-auto text-center">
              &copy; {new Date().getFullYear()} My App. All rights reserved.
            </div>
          </footer>
        </body>
      </html>
    </Provider>
  );
}