import React from "react";
import Banner from "@/components/banner";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <NavBar />
      <main>{children}</main>
      <div>
        <Footer />
      </div>
    </>
  );
}
