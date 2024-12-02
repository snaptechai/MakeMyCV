import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Images
import Logo from "@/../public/img/logo.svg";

export default function NavBar() {
  return (
    <nav className="h-20 w-full">
      <div className="fixed z-50 h-20 w-full border-b bg-white">
        <div className="mx-auto max-w-8xl">
          <div className="mx-5 flex h-20 items-center justify-between border-b">
            <Link href={"/"}>
              <Image src={Logo} alt="MakeMyCV" />
            </Link>
            <Button asChild>
              <Link href={"/create"}>Create your CV</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
