import React from "react";
import { db } from "@/db";
import { isNotNull, min } from "drizzle-orm";
import { careerLevel } from "@/db/schema";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function PriceCard() {
  const priceData = await db
    .select({
      lowestPrice: min(careerLevel.price),
      loweredFrom: careerLevel.oldPrice,
    })
    .from(careerLevel)
    .where(isNotNull(careerLevel.oldPrice))
    .groupBy(careerLevel.oldPrice);
  return (
    <div className="mx-5 flex flex-col items-center rounded-2xl bg-accent-1 px-16 py-14 text-accent-1-foreground md:flex-row md:justify-between">
      <div>
        <h2 className="font-light">Wondering about pricing?</h2>
        <h2 className="mt-3 flex flex-col lg:flex-row">
          It just starts from
          <span className="text-orange-400 line-through lg:ml-3">
            Rs. 1499/=
          </span>
          <span className="text-4xl font-bold lg:ml-5">
            Rs.{priceData.length !== 0 && priceData[0].lowestPrice}/=
          </span>
        </h2>
        <p className="text-sm">
          *The price structure builds with your experience.
        </p>
      </div>
      <div className="m-5">
        <Button
          size={"lg"}
          className="bg-yellow-500 px-12 py-7 text-black hover:bg-yellow-500"
          asChild
        >
          <Link href={"/begin"}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
