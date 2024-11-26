"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TicketPercentIcon } from "lucide-react";
import { numberToCurrencyString } from "@/lib/currency";
import { checkCoupon } from "@/server/actions/check-coupon";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getPaymentDetails } from "@/server/actions/get-payment-details";
import Script from "next/script";
import PaymentDialog, { PaymentStatus } from "@/components/dialogs/payment-dialog";
import { checkPaymentStatus } from "@/server/actions/check-payment-status";

const formSchema = z.object({
  coupon_code: z.string().min(1, {
    message: "Coupon code is required.",
  }),
});

export default function PaymentForm({ price, id }: { price: number; id: string }) {
  const [discount, setDiscount] = React.useState<number>(0);
  const [termChecked, setTermChecked] = React.useState<boolean>(false);
  const [pending, setPending] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = React.useState<PaymentStatus>();
  const [paymentError, setPaymentError] = React.useState<string | undefined>();
  const [discountLoading, setDiscountLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coupon_code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDiscountLoading(true);
    const res = await checkCoupon(values.coupon_code, id);
    if (res.error) {
      form.setError("coupon_code", {
        type: "manual",
        message: res.error,
      });
    }
    setDiscount(res.discount);
    if (res.discount === 100) {
      setPaymentStatus("Success");
      setDialogOpen(true);
    }
    setDiscountLoading(false);
  }

  const onPay = async () => {
    setPending(true);
    const paymentDetails = await getPaymentDetails(form.getValues("coupon_code"), id);
    if (paymentDetails.error) {
      return;
    }

    // @ts-ignore
    payhere?.startPayment(paymentDetails.details);

    // @ts-ignore
    payhere.onCompleted = function onCompleted(orderId) {
      let attempts = 0;
      const maxAttempts = 7;
      const interval = setInterval(async () => {
        const res = await checkPaymentStatus(form.getValues("coupon_code"), id);
        attempts++;
        if (res.status !== "Waiting" || attempts >= maxAttempts) {
          clearInterval(interval);
          if (res.status === "Waiting") {
            setPaymentStatus("Failed");
          } else {
            // @ts-ignore
            setPaymentStatus(res.status);
          }
          setDialogOpen(true);
          setPending(false);
        }
      }, 1000);
    };

    // @ts-ignore
    payhere.onDismissed = function onDismissed() {
      setPaymentStatus("Failed");
      setDialogOpen(true);
      setPending(false);
    };

    // @ts-ignore
    payhere.onError = function onError(error: any) {
      setPaymentStatus("FailedWithError");
      setPaymentError(error);
      setDialogOpen(true);
      setPending(false);
    };
  };

  return (
    <>
      {/* Pay here script */}
      <Script src="https://www.payhere.lk/lib/payhere.js" />

      <div className="grid md:grid-cols-3">
        <div>
          <h3>Promotions</h3>
          <span className="text-sm text-slate-600">Do you have a coupon code?</span>
        </div>
        <div className="col-span-2 max-md:mt-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                disabled={discount > 0}
                name="coupon_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount coupon</FormLabel>
                    <FormControl>
                      <div className="relative flex w-full items-center">
                        <TicketPercentIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform" />
                        <Input className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {discount === 0 && (
                <div className="flex w-full justify-end">
                  <Button
                    className="bg-[#198754] hover:bg-[#157347]"
                    type="submit"
                    disabled={discountLoading}
                  >
                    {discountLoading && (
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0c-4.418 0-8 3.582-8 8z"
                        />
                      </svg>
                    )}
                    Get Discount
                  </Button>
                </div>
              )}
            </form>
          </Form>
          <div className="mt-10 flex w-full flex-col items-center space-y-5">
            <div className="flex h-full w-full items-center justify-between">
              <span className="text-slate-700">Cover letter</span>
              <span>0.00 LKR</span>
            </div>
            <div className="flex h-full w-full items-center justify-between">
              <span className="text-slate-700">Subtotal</span>
              <span>{numberToCurrencyString(price)}</span>
            </div>
            <div className="flex h-full w-full items-center justify-between">
              <span className="text-slate-700">Discount {discount !== 0 && `(${discount}%)`}</span>
              <span>{numberToCurrencyString((price * discount) / 100)}</span>
            </div>
            <Separator />
            <div className="flex h-full w-full items-center justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                {numberToCurrencyString(price - (price * discount) / 100)}
              </span>
            </div>
          </div>
          <div className="mt-12 space-y-10">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={termChecked}
                onCheckedChange={(state) => setTermChecked(state as boolean)}
                id="terms"
              />
              <div className="grid gap-1.5 leading-none">
                <label htmlFor="terms" className="text-sm font-medium text-slate-700">
                  By proceeding with payment, you agree to our{" "}
                  <Link href={"/privacy-policy"} className="text-accent-1">
                    Terms of Service
                  </Link>{" "}
                  and confirm your understanding and acceptance of the same.
                </label>
              </div>
            </div>
            <Button onClick={onPay} disabled={!termChecked || pending} className="w-full">
              {pending && (
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0c-4.418 0-8 3.582-8 8z"
                  />
                </svg>
              )}
              Pay {numberToCurrencyString(price - (price * discount) / 100)}
            </Button>
            <div className="flex items-center justify-center py-10">
              <img src="/img/form/payment-methods.svg" alt="Payment Methods" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Dialog */}
      <PaymentDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        status={paymentStatus}
        errors={paymentError}
        id={id}
      />
    </>
  );
}
