import { Card, CardContent } from "@/components/ui/card";
import { randomColor } from "@/lib/colors";
import { getTemplates } from "@/server/helpers/template";
import React from "react";
import { DialogContent, DialogTrigger, Dialog, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const dynamic = "force-dynamic";

export default async function () {
  const templates = await getTemplates();
  return (
    <>
      <div className="mx-auto mt-10 max-w-9xl px-5 text-left md:mt-20">
        <h1 className="text-center">Stand Out with Our Premium CV Templates</h1>
        <p className="mt-5 text-center text-slate-600">
          Elevate your professional image with our bespoke CV templates, aimed at helping you leave
          a memorable impression on recruiters.
        </p>
        <TemplateList templates={templates} start={0} end={12} />
      </div>
      <section className="mx-auto my-10 bg-gray-50 py-16 text-center max-md:mx-5 md:my-24 md:py-24">
        <div className="mx-auto max-w-9xl">
          <h2 className="text-4xl max-md:text-start">Wait, We Have Even More Templates!</h2>
          <p className="mx-auto max-w-xl text-slate-700 max-md:text-start">
            Our layouts prioritize readability, ensuring your key skills and experiences are
            effortlessly highlighted and easily scanned by hiring managers.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <div className="flex max-w-[26rem] flex-col items-center justify-center gap-6">
              <img src="/img/home/hero-1.svg" />
              <span className="text-lg font-semibold">ATS friendly</span>
              <span className="text-slate-600">
                With our ATS-friendly templates, your CV is optimized for keyword detection, making
                sure it doesn't get lost in the automated recruitment process.
              </span>
            </div>
            <div className="flex max-w-[26rem] flex-col items-center justify-center gap-6">
              <img src="/img/home/hero-2.svg" />
              <span className="text-lg font-semibold">Modern CV templates</span>
              <span className="text-slate-600">
                Our modern CV templates are designed with current industry trends in mind, ensuring
                your application remains relevant and engaging.
              </span>
            </div>
            <div className="flex max-w-[26rem] flex-col items-center justify-center gap-6">
              <img src="/img/home/hero-3.svg" />
              <span className="text-lg font-semibold">Unleashing Your Potential</span>
              <span className="text-slate-600">
                We blend creativity with professionalism to highlight your skills and experiences,
                creating a powerful impression on hiring managers.
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto mt-10 max-w-8xl px-5 text-left md:mt-20">
        <TemplateList templates={templates} start={12} end={20} />
      </div>
      <section className="mx-auto mt-10 bg-gray-50 px-5 pt-16 md:mt-24 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center md:flex-row">
          <div className="mr-12">
            <span className="font-semibold text-primary">Get to know us</span>
            <h2 className="mt-2 text-4xl">Expert CV Crafting for Sri Lanka and Beyond</h2>
            <p className="mt-5 text-slate-600">
              Drawing from a mix of seasoned writers and career experts, our team is adept at
              turning your career milestones into compelling CVs tailored for both the Sri Lankan
              and international job markets.
            </p>
            <Button size={"lg"} asChild className="mt-10">
              <Link href="/team">About Us</Link>
            </Button>
          </div>
          <div className="max-md:mt-10">
            <img className="max-w-full md:max-w-xl" src="/img/home/hero-team.png" alt="Team" />
          </div>
        </div>
      </section>
    </>
  );
}

const TemplateList = ({
  templates,
  start,
  end,
}: {
  templates: Awaited<ReturnType<typeof getTemplates>>;
  start: number;
  end: number;
}) => {
  return (
    <>
      <section className="mt-32 hidden grid-cols-4 gap-16 md:grid">
        {templates.slice(start, end).map((template) => (
          <div key={template.id}>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="group aspect-[0.74/1] transition hover:scale-[1.02] hover:border hover:border-accent-1">
                  <CardContent className="relative flex h-full items-center justify-center overflow-y-hidden">
                    <div className="absolute top-0 z-10 mt-1 h-full">
                      <img
                        loading="lazy"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/web/images/uploads/template/${template.image}`}
                      />
                    </div>
                    <div className="absolute inset-0 h-full w-full items-center justify-center hover:cursor-pointer">
                      <div className="absolute inset-0 z-20 hidden h-full w-full bg-primary/15 group-hover:flex"></div>
                      <div className="absolute inset-0 z-30 flex items-center justify-center group-hover:flex"></div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="mx-auto flex max-w-full justify-center border-transparent bg-transparent shadow-none">
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <img
                      className="max-h-[80vh]"
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/web/images/uploads/template/${template.image}`}
                    />
                  </div>
                  <div>
                    <h4 className="my-2 px-3 text-lg font-semibold text-white">{template.title}</h4>
                    <div className="flex flex-wrap gap-1 px-3 text-xs">
                      {template.detailed_tags.map((tag) => (
                        <span
                          key={tag.tag}
                          style={{
                            backgroundColor: tag.background_color,
                            color: tag.text_color,
                          }}
                          className="rounded-xl px-3 py-1"
                        >
                          {tag.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogClose className="absolute right-5 top-0 rounded-full bg-black bg-opacity-50 p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </DialogClose>
              </DialogContent>
            </Dialog>

            <h4 className="mb-2 mt-5 text-lg font-bold">{template.title}</h4>
            <span className="text-base text-slate-700">{template.description}</span>
            <div className="mt-5 flex flex-wrap gap-1 text-xs">
              {template.tags.map((tag) => (
                <span key={tag} style={randomColor(tag.length)} className="rounded-xl px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="md:hidden">
        <Carousel
          opts={{
            loop: true,
          }}
          className="mt-10 w-full"
        >
          <CarouselContent className="-ml-1 w-full max-w-9xl">
            {templates.slice(start, end).map((template, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-5">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="group aspect-[0.74/1] transition hover:scale-[1.02] hover:border hover:border-accent-1">
                        <CardContent className="relative flex h-full items-center justify-center overflow-y-hidden">
                          <div className="absolute top-0 z-10 mt-1 h-full">
                            <img
                              loading="lazy"
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/web/images/uploads/template/${template.image}`}
                            />
                          </div>
                          <div className="absolute inset-0 h-full w-full items-center justify-center hover:cursor-pointer">
                            <div className="absolute inset-0 z-20 hidden h-full w-full bg-primary/15 group-hover:flex"></div>
                            <div className="absolute inset-0 z-30 flex items-center justify-center group-hover:flex"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="mx-auto flex max-w-full justify-center border-transparent bg-transparent shadow-none">
                      <div className="flex flex-col items-center justify-center">
                        <div>
                          <img
                            className="max-h-[80vh]"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/web/images/uploads/template/${template.image}`}
                          />
                        </div>
                        <div>
                          <h4 className="my-2 px-3 text-lg font-semibold text-white">
                            {template.title}
                          </h4>
                          <div className="flex flex-wrap gap-1 px-3 text-xs">
                            {template.detailed_tags.map((tag) => (
                              <span
                                key={tag.tag}
                                style={{
                                  backgroundColor: tag.background_color,
                                  color: tag.text_color,
                                }}
                                className="rounded-xl px-3 py-1"
                              >
                                {tag.tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogClose className="absolute right-5 top-0 rounded-full bg-black bg-opacity-50 p-2 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </div>

                <h4 className="mb-2 mt-5 text-lg font-semibold">{template.title}</h4>
                <span className="text-sm text-slate-700">{template.description}</span>
                <div className="mt-5 flex flex-wrap gap-1 text-xs">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      style={randomColor(tag.length)}
                      className="rounded-xl px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute bg-primary text-white hover:bg-accent-1 hover:text-white max-xl:ml-8" />
          <CarouselNext className="absolute bg-primary text-white hover:bg-accent-1 hover:text-white max-2xl:mr-8" />
        </Carousel>
      </section>
    </>
  );
};
