import React from "react";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { cv } from "@/db/schema";
import PaymentForm from "./form";
import { decryptOrderId } from "@/lib/decrypt";

export default async function Payment({ params }: { params: { id: string } }) {
  const id = await decryptOrderId(params.id);

  const careerLevelFromCv = await db.query.cv.findFirst({
    where: eq(cv.id, id),
    with: {
      careerLevel: true,
    },
    columns: {
      careerLevel: true,
    },
  });

  if (!careerLevelFromCv) {
    notFound();
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-7xl px-5">
      <h1 className="text-center text-accent-text">Payment</h1>
      <p className="px-8 text-center text-slate-700">
        With a simple and secure payment, you're one step closer to owning a standout CV that opens
        doors to opportunities.
      </p>
      <Separator className="my-10" />
      <PaymentForm price={careerLevelFromCv.careerLevel.price} id={params.id} />
    </div>
  );
}
