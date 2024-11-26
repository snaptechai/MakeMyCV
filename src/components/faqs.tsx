import React from "react";
import { db } from "@/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function FAQs() {
  const faqData = await db.query.fandq.findMany({
    columns: {
      id: true,
      question: true,
      answer: true,
    },
  });
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-4xl font-bold">Frequently asked questions</h3>
        <p>Everything you need to know about the product and billing.</p>
      </div>
      <div className="mt-12">
        <Accordion type="single" collapsible className="space-y-1">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-left text-slate-800">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
