import React from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

export type PaymentStatus =
  | "Success"
  | "Failed"
  | "Canceled"
  | "Chargedback"
  | "Pending"
  | "Fake"
  | "FailedWithError";

type PaymentDialogProps = {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: PaymentStatus | undefined;
  errors?: string;
};

const getButton = (status: string, id: string) => {
  if (status === "Success") {
    return (
      <Button className="w-full" asChild>
        <Link href={`/progress/${id}`}>View progress</Link>
      </Button>
    );
  } else {
    return (
      <Button className="w-full" variant={"destructive"}>
        Try again
      </Button>
    );
  }
};

const statusConfig = {
  Success: {
    imgSrc: "/img/status/success.svg",
    title: "Payment successfull",
    message: "Your payment was successful, marking the start of our collaborative journey.",
  },
  Canceled: {
    imgSrc: "/img/status/danger.svg",
    title: "Payment canceled",
    message: "Your payment has been canceled.",
  },
  Failed: {
    imgSrc: "/img/status/danger.svg",
    title: "Payment failed",
    message:
      "Your payment did not go through successfully. Please check your details and try again.",
  },
  Chargedback: {
    imgSrc: "/img/status/danger.svg",
    title: "Payment chargedback",
    message:
      "Your payment did not go through successfully. Please check your details and try again.",
  },
  Pending: {
    imgSrc: "/img/status/danger.svg",
    title: "Payment pending",
    message:
      "Your payment did not go through successfully. Please check your details and try again.",
  },
  Fake: {
    imgSrc: "/img/status/danger.svg",
    title: "Payment issue",
    message: "Your payment was successful, but there is a issue, Please contact us",
  },
  FailedWithError: {
    imgSrc: "/img/status/danger.svg",
    title: "Payment failed with error",
    message: (errors: string) => errors,
  },
};

export default function PaymentDialog({ open, setOpen, status, errors, id }: PaymentDialogProps) {
  if (!status) return null;
  const config = statusConfig[status];
  if (!config) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <img src={config.imgSrc} className="h-14 w-14" />
          <h3 className="font-semibold">{config.title}</h3>
          <span className="max-w-md text-sm">
            {typeof config.message === "function" ? config.message(errors!) : config.message}
          </span>
          <DialogClose asChild>{getButton(status, id)}</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
