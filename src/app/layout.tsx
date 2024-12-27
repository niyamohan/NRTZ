// src/app/layout.tsx
import Header from "../components/Header";
import "../styles/globals.css"

export const metadata = {
  title: "My App",
  description: "Account Management App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
        <meta name="description" content="Account Management App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 container mx-auto p-4">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-4">
          <div className="container mx-auto text-center">
            &copy; {new Date().getFullYear()} My App. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}