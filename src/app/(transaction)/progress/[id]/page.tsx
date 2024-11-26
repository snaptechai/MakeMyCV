import React from "react";
import { db } from "@/db";
import { cv } from "@/db/schema";
import { decryptOrderId } from "@/lib/decrypt";
import { eq } from "drizzle-orm";
import { CheckIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import ClipboardCopy from "@/components/ui/clipboard-copy";

export default async function Progress({ params }: { params: { id: string } }) {
  const id = await decryptOrderId(params.id);
  const cvData = await db.query.cv.findFirst({
    where: eq(cv.id, id),
    columns: {
      status: true,
      email: true,
    },
  });
  if (!cvData) {
    notFound();
  }

  const steps = [
    { label: "Order placed", isCompleted: true, isActive: false },
    {
      label: "CV writing",
      isCompleted:
        cvData.status !== "Pending" && cvData.status !== "Preparing" && cvData.status !== "Error",
      isActive: cvData.status === "Pending" || cvData.status === "Preparing",
      inProgressLabel: "in progress",
    },
    {
      label: "Expert review",
      isCompleted: cvData.status === "Ready" || cvData.status === "Approved",
      isActive: cvData.status === "Ready",
      inProgressLabel: "in progress",
    },
    { label: "Delivered", isCompleted: cvData.status === "Approved", isActive: false },
  ];

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@");
    return `${username.slice(0, 2)}***@${domain}`;
  };

  return (
    <>
      <div className="mx-auto mt-16 w-full max-w-7xl px-5">
        <h1 className="text-center tracking-wide text-accent-text">Thanks for choosing us!</h1>
        <p className="mx-auto max-w-2xl px-8 pt-5 text-center text-lg text-slate-700">
          We feel privileged that you chose us to enhance your career prospects. A heartfelt thank
          you from our team!
        </p>
        <div className="mb-5 mt-16 flex flex-col justify-between max-md:gap-10 md:mt-28 md:flex-row">
          {steps.map((step, index) => (
            <Step key={index} {...step} index={index} />
          ))}
        </div>
      </div>
      <div className="mt-16 flex w-full justify-center bg-[#42307d] px-5 py-10 text-white md:mt-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h3 className="text-2xl font-semibold">This link is for you to check progress</h3>
          <p className="text-white/90">
            To ensure you're always in the loop, here's a link to check the progress of your CV at
            any time. Also you are getting updates to{" "}
            <span className="font-bold">{maskEmail(cvData.email)}</span>
          </p>
          <div className="mt-8">
            <ClipboardCopy text={`https://www.makemycv.lk/p/${btoa(id.toString())}`} />
          </div>
        </div>
      </div>
    </>
  );
}

const Step = ({
  isActive,
  isCompleted,
  label,
  inProgressLabel,
  index,
}: {
  isActive: boolean;
  isCompleted: boolean;
  label: string;
  inProgressLabel?: string;
  index: number;
}) => (
  <div className="relative flex flex-1 flex-row items-center max-md:ml-5 max-md:gap-2 md:flex-col">
    <div
      className={cn(
        "z-20 mb-1.5 flex h-10 w-10 items-center justify-center rounded-full",
        isCompleted || isActive ? "bg-primary" : "bg-gray-200",
      )}
    >
      {!isActive && isCompleted ? (
        <CheckIcon className="text-white" />
      ) : (
        <span className="h-3 w-3 rounded-full bg-white"></span>
      )}
    </div>
    <div className="flex flex-col justify-center md:items-center">
      <div className={cn("text-base font-semibold", isActive ? "text-accent-1" : "text-gray-700")}>
        {label}
      </div>
      {isActive && inProgressLabel && (
        <span className="mt-2 text-sm font-semibold text-accent-1">{inProgressLabel}</span>
      )}
    </div>
    {index !== 0 && (
      <div
        className={cn(
          "absolute left-[-50%] top-5 -z-10 hidden w-full border-b-2 md:block",
          isCompleted ? "border-primary" : "border-gray-200",
        )}
      ></div>
    )}
    {index !== 3 && (
      <div
        className={cn(
          "absolute -z-10 max-md:left-5 max-md:top-[80%] max-md:h-full max-md:w-0 max-md:border-l-2 md:left-[50%] md:top-5 md:w-full md:border-b-2",
          isCompleted ? "border-primary" : "border-gray-200",
        )}
      ></div>
    )}
  </div>
);
