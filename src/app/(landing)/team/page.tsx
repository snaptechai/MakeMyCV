import React from "react";
import Image from "next/image";
import { Metadata } from "next";

//Images
import SankaImage from "@/../public/img/team/sanka.jpg";
import ThusithImage from "@/../public/img/team/thusith.jpg";
import AmilaImage from "@/../public/img/team/amila.jpg";
import MintSImage from "@/../public/img/team/mintS.png";
import BeenuImage from "@/../public/img/team/beenu.png";

export const metadata: Metadata = {
  title: "About Us | MakeMyCV",
};

export default function Team() {
  return (
    <div className="mx-auto my-10 max-w-8xl px-5 text-left md:my-20">
      <h1>Our team</h1>
      <p className="text-slate-600">
        Drawing from a mix of seasoned writers and career experts, our team is adept at turning your
        career milestones into compelling CVs tailored for both the Sri Lankan and international job
        markets.
      </p>
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        <div>
          <Image src={SankaImage} alt="Sanka R. Gunawardhana" className="rounded-lg" width={250} />
          <h3 className="mt-2 max-w-60 text-xl font-semibold">Sanka R. Gunawardhana</h3>
          <h4 className="mt-1 max-w-60 text-accent-1">Chief Strategy Officer</h4>
        </div>
        <div>
          <Image src={ThusithImage} alt="Thusith Thennakoon" className="rounded-lg" width={250} />
          <h3 className="mt-2 max-w-60 text-xl font-semibold">Thusith Thennakoon</h3>
          <h4 className="mt-1 max-w-60 text-accent-1">Head of Operations</h4>
        </div>
        <div>
          <Image
            src={AmilaImage}
            alt="Amila Eranda Dharmakeerthi"
            className="rounded-lg"
            width={250}
          />
          <h3 className="mt-2 max-w-60 text-xl font-semibold">Amila Eranda Dharmakeerthi</h3>
          <h4 className="mt-1 max-w-60 text-accent-1">Head of Digital Marketing</h4>
        </div>
        <div>
          <Image width={250} src={MintSImage} alt="mint Solutions" className="rounded-lg" />
          <h3 className="mt-2 max-w-60 text-xl font-semibold">mint Solutions</h3>
          <h4 className="mt-1 max-w-60 text-accent-1">IT Partner</h4>
        </div>
      </div>
      <div className="mt-20 flex flex-col items-center justify-center rounded-3xl bg-secondary/70 p-20 text-center text-secondary-foreground">
        <span className="font-semibold text-primary">From our team</span>
        <h2 className="mt-6 text-xl md:text-3xl">
          #MakeMyCV truly values work-life balance. We work hard and deliver, but at the end of the
          day you can switch off.
        </h2>
        <Image
          className="mt-5 rounded-full"
          width={80}
          src={BeenuImage}
          alt="Beenu Yashodhara
"
        />
        <h5 className="mt-2 text-base font-semibold">Beenu Yashodhara</h5>
        <span className="text-sm text-slate-500">Content Writer</span>
      </div>
    </div>
  );
}
