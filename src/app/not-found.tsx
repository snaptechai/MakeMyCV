import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Link from "next/link";
import React from "react";

export default function NotFound() {
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
      <main className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center">
        <img
          src="/img/not-found.svg"
          alt="404"
          className="mx-auto size-72 sm:size-96 xl:size-[35rem]"
        />
        <h1 className="text-center text-3xl font-bold text-[#4c289a]">Page Not Found</h1>
      </main>
      <Footer />
    </>
  );
}
