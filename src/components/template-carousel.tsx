"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { template } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "./ui/button";

export default function TemplateCarousel({
  templates,
}: {
  templates: (typeof template.$inferSelect)[];
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <div>
      <Carousel
        opts={{
          loop: true,
        }}
        className="flex w-full flex-col"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="w-full">
          {templates.map((template, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-3/12">
              <div className="p-5">
                <Card
                  className={cn(
                    "aspect-[0.74/1] scale-75 transition-all delay-100 duration-500 ease-in-out",
                    current == index && "scale-95",
                  )}
                >
                  <CardContent className="relative flex h-full items-center justify-center overflow-y-hidden">
                    <div className="absolute top-0 z-30 mt-1 h-full">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/web/images/uploads/template/${template.image}`}
                      />
                    </div>
                    {current !== index && (
                      <div className="absolute inset-0 z-30 bg-primary opacity-35"></div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="relative mx-auto mt-10 flex w-full max-w-7xl justify-center">
          <div className="absolute flex w-full justify-between px-5">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fac415]"
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft className="h-5 w-5 text-black" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fac415]"
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight className="h-5 w-5 text-black" />
            </button>
          </div>
          <div className="max-md:mt-10">
            <h4 className="my-2 px-3 text-xl font-semibold">{templates[current].title}</h4>
            <span className="text-sm">{templates[current].description}</span>
          </div>
        </div>
      </Carousel>
      <Button
        size={"lg"}
        className="mt-8 bg-slate-50 font-semibold text-black"
        variant={"outline"}
        asChild
      >
        <Link href={"/templates"}>View all templates</Link>
      </Button>
    </div>
  );
}
