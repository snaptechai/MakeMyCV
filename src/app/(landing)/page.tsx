import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PriceCard from "@/components/price-card";
import FAQs from "@/components/faqs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { template } from "@/db/schema";

// Images
import AboutImage from "@/../public/img/home/about.jpg";
import OrderProcess from "@/../public/img/home/order-process.jpg";
import FAQImage from "@/../public/img/home/faq.png";
import Link from "next/link";
import DemoButton from "@/components/demo-button";
import TemplateCarousel from "@/components/template-carousel";

export default async function Home() {
  const templates = await db.select().from(template).where(eq(template.numbbrOfPages, 1)).limit(10);
  return (
    <div>
      <section className="py-16 max-md:pb-1">
        <div className="container mx-auto max-w-3xl lg:max-w-[650px] xl:max-w-[720px] 2xl:max-w-full">
          <div className="mx-5 text-center">
            <h1 className="mb-5 text-center text-5xl font-bold tracking-normal md:mb-12 md:text-6xl xl:text-6xl">
              Make Your First Impression Count!
            </h1>
            <p className="mx-auto leading-7 text-slate-600 xl:max-w-2xl">
              <span className="font-semibold">MakeMyCV:</span> Your partner in professional growth.
              We turn your career story into a compelling CV, creating a strong first impression for
              potential employers.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 xl:flex-row">
              <DemoButton />
              <Button
                size={"lg"}
                className="flex h-12 w-full items-center text-center max-md:max-w-96 md:max-xl:h-16 xl:max-w-fit"
                asChild
              >
                <Link href={"/create"}>Start creating your CV now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto pb-5">
        <div className="inline-flex w-full flex-nowrap justify-center overflow-x-hidden">
          <div className="flex animate-infinite-scroll-forward items-center hover:animate-infinite-scroll-backward min-[3433px]:animate-infinite-scroll-backward [&_img]:max-w-none">
            <img className="h-72" src="/img/home/hero.webp" />
          </div>
        </div>
      </section>

      <section className="mx-auto flex justify-center bg-accent-1 py-24 text-accent-1-foreground">
        <div className="flex w-full flex-col items-center text-center">
          <h2 className="px-5 text-4xl">CV templates for every career level</h2>
          <p className="max-w-3xl px-5 font-semibold leading-relaxed text-purple-200 max-md:text-sm">
            Explore our diverse selection of CV templates, endorsed by HR experts, which have
            sparked an impressive number of career shifts across the globe.
          </p>
          <div className="mt-10 w-full">
            <TemplateCarousel templates={templates} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-9xl px-8 py-12 md:px-20">
        <div className="grid grid-flow-row items-center justify-center space-y-16 lg:grid-cols-2">
          <div className="mr-10 flex h-full flex-col justify-center">
            <span className="mb-2 justify-start text-start font-semibold text-primary">
              Let us help you
            </span>
            <h2 className="text-3xl md:text-4xl">
              Increase your chances of landing your dream job by 50%!
            </h2>
            <p className="text-lg text-slate-700">
              Investing in a professionally written CV is a step towards advancing your career. And
              when it has the potential to increase your job prospects by 50%, it's an opportunity
              you can't afford to miss. Stand out from the crowd, command attention, and open doors
              to opportunities you never knew existed.
            </p>
            <div className="mt-10 flex space-x-5">
              <Button size={"lg"} variant={"outline"} asChild>
                <Link href={"/team"}>About Us</Link>
              </Button>
              <Button size={"lg"} className="bg-[#25D366] hover:bg-[#25d365d7]" asChild>
                <Link target="_blank" href={"https://wa.me/+94777923678"}>
                  <img
                    className="mr-2 h-6 w-6 invert"
                    src="/img/socials/whatsapp.svg"
                    alt="WhatsApp"
                  />
                  Whatsapp Us
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <Image height={800} src={AboutImage} alt="About" className="rounded-md" />
          </div>
        </div>
      </section>

      <section className="mx-auto my-10 max-w-8xl">
        <PriceCard />
      </section>

      <section className="mx-auto my-40 max-w-9xl px-5">
        <div className="text-center">
          <h2 className="text-center md:text-4xl">
            Advantages of using <span className="text-primary">#MakeMyCV</span>
          </h2>
          <p className="text-slate-700">
            Enhance your chances of getting noticed by top employers by utilizing the
            industry-specific CVs.
          </p>
        </div>
        <div className="mt-14 grid grid-flow-row justify-center gap-5 xl:grid-cols-3">
          <div className="flex max-w-md flex-col items-center text-center">
            <img className="h-12 w-12" src="/img/home/features-1.svg" />
            <h4 className="mt-5 text-xl font-semibold">Professional, Customizable Templates</h4>
            <p className="text-slate-700">
              With #MakeMyCV's versatile templates, you have the flexibility to create a CV that
              truly mirrors your unique skills and accomplishments.
            </p>
          </div>
          <div className="flex max-w-md flex-col items-center text-center">
            <img className="h-12 w-12" src="/img/home/features-2.svg" />

            <h4 className="mt-5 text-xl font-semibold">We Write, You Shine</h4>
            <p className="text-slate-700">
              We will be crafting your entire CV providing professional guidance to improve your
              application and enhance the probability of securing your desired position.
            </p>
          </div>
          <div className="flex max-w-md flex-col items-center text-center">
            <img className="h-12 w-12" src="/img/home/features-3.svg" />
            <h4 className="mt-5 text-xl font-semibold">
              Fully Tailored Cover Letters, Written for You
            </h4>
            <p className="text-slate-700">
              Leave a lasting impression with our 'Fully Tailored Cover Letters, Written for You'.
              Your uniqueness, our words.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 px-10 py-24 text-secondary-foreground">
        <div className="mx-auto max-w-lg md:max-w-7xl">
          <div className="flex flex-col">
            <h2 className="text-4xl">Order process</h2>
            <h3 className="mt-3 text-slate-700">
              Our straightforward ordering system allows for customization and easy review before
              finalizing your purchase.
            </h3>
          </div>
          <div className="mt-16 flex flex-col items-center justify-center xl:flex-row">
            <div className="mr-10 flex flex-col">
              <div className="flex flex-col border-l-4 border-slate-200 px-3 py-5 hover:border-primary">
                <h3 className="text-xl font-semibold">Select your career level and template</h3>
                <p className="text-slate-600">
                  Kickstart the process by selecting your career level and template from #MakeMyCV's
                  diverse range, aligning your CV with your professional journey.
                </p>
              </div>
              <div className="flex flex-col border-l-4 border-slate-200 px-3 py-5 hover:border-primary">
                <h3 className="text-xl font-semibold">Submit your information</h3>
                <p className="text-slate-600">
                  Submit your information easily through our secure platform, ensuring your unique
                  career highlights are showcased effectively.
                </p>
              </div>
              <div className="flex flex-col border-l-4 border-slate-200 px-3 py-5 hover:border-primary">
                <h3 className="text-xl font-semibold">Payment</h3>
                <p className="text-slate-600">
                  The payment process on #MakeMyCV is secure and user-friendly, offering multiple
                  payment options for your convenience.
                </p>
              </div>
              <div className="flex flex-col border-l-4 border-slate-200 px-3 py-5 hover:border-primary">
                <h3 className="text-xl font-semibold">Delivery of the final product</h3>
                <p className="text-slate-600">
                  Upon payment confirmation, an SMS notification will be sent to you, indicating
                  that your finely crafted CV is ready for download. Start your job search journey
                  with newfound confidence.
                </p>
              </div>
            </div>
            <div className="max-w-xl max-xl:mt-10">
              <Image width={1200} src={OrderProcess} alt="Order Process" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 md:py-28">
        <FAQs />
      </section>

      <section className="mx-auto mb-10 flex max-w-7xl flex-col items-center justify-center rounded-2xl bg-secondary/50 px-5 py-10 text-center text-secondary-foreground">
        <div>
          <Image width={150} src={FAQImage} alt="FAQs" />
        </div>
        <h3 className="mt-2 text-xl font-semibold">Still have questions?</h3>
        <p className="text-slate-800">
          Can't find the answer you're seeking? Please chat with our friendly team.
        </p>
        <Button className="mt-5 h-10" asChild>
          <Link target="_blank" href={"https://wa.me/+94777923678"}>
            Get in touch
          </Link>
        </Button>
      </section>
    </div>
  );
}
