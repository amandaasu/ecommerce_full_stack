import "./globals.css";
import Navbar from "./components/Navbar";
import ChatBot from "./components/ChatBot";
import { Suspense } from "react";

export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen pt-16">
        <Suspense>
          <Navbar />
          {children}
          <div className="bg-gray-50 flex items-center justify-center">
            <ChatBot />
          </div>
        </Suspense>
      </body>
    </html>
  );
}
