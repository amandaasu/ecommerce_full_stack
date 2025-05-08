import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen pt-16">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
