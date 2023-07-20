"use client";
import Header from "@/components/header";
import "./globals.css";
import { StoreProvider } from "@/utilis/Store";

export const metadata = {
  title: "Ecommerce",
  description: "Ecommerce Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
