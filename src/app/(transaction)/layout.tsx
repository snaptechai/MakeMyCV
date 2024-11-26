import React from "react";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
import Link from "next/link";

export default function TransactionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <div className="fixed z-50 h-20 w-full border-b bg-white">
        <div className="mx-auto h-full max-w-7xl">
          <div className="flex h-full items-center justify-start px-5">
            <Link href="/">
              <img src="/img/logo.svg" alt="logo" className="h-6" />
            </Link>
          </div>
        </div>
      </div>
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
