import React from "react";
import Footer from "@/components/footer";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}
