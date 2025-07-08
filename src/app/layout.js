// app/layout.js
"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Routes jahan navbar/footer hide karna hai
  const hideLayoutRoutes = ["/login", "/signup"];

  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        {!shouldHideLayout && <Navbar />}
        <main>{children}</main>
        {!shouldHideLayout && <Footer />}
      </body>
    </html>
  );
}
