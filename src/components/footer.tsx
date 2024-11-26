import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="mx-auto flex bg-accent-1 px-20 py-10 text-accent-1-foreground/80 lg:py-20">
      <div className="mx-auto flex w-full max-w-8xl flex-col justify-between lg:flex-row">
        <div className="hidden flex-col lg:flex">
          <img className="w-32" src="/img/logo-white.svg" alt="Logo" />
          <h4 className="mt-2">&copy; 2024 MakeMyCV. All rights reserved.</h4>
        </div>
        <div className="flex flex-col max-lg:items-center">
          <div className="flex gap-5">
            <Link href={"/team"}>About us</Link>
            <Link href={"/privacy-policy"}>Privacy</Link>
            <Link href={"/cookie-policy"}>Cookie policy</Link>
          </div>
          <div className="mt-5 flex justify-end gap-5">
            <Link target="_blank" href={"https://www.facebook.com/makemycvofficial"}>
              <img src="/img/socials/facebook.svg" />
            </Link>
            <Link target="_blank" href={"https://www.instagram.com/makemy_cv"}>
              <img src="/img/socials/instagram.svg" />
            </Link>
            <Link target="_blank" href={"https://www.linkedin.com/company/make-my-cv"}>
              <img src="/img/socials/linkedin.svg" />
            </Link>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center text-center lg:hidden">
          <img className="w-32" src="/img/logo-white.svg" alt="Logo" />
          <h4 className="mt-2">&copy; 2024 MakeMyCV. All rights reserved.</h4>
        </div>
      </div>
    </div>
  );
}
