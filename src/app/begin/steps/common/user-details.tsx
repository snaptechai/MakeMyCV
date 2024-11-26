import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useStepContext } from "@/providers/step-provider";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUpload } from "@/components/ui/image-upload";

export default function UserDetails() {
  const { updateFormValues, setCurrentStep, needImage, formValues } = useStepContext();

  const formSchema = z
    .object({
      first_name: z.string().min(1, {
        message: "First name is required",
      }),
      last_name: z.string().min(1, {
        message: "Last name is required",
      }),
      email: z.string().email(),
      email_confirmation: z.string().email(),
      phone_number: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
      get_updates: z.boolean(),
      image: needImage
        ? z.string().min(2, {
            message: "Image is required",
          })
        : z.string().optional(),
    })
    .refine(
      (values) => {
        if (values.email !== values.email_confirmation) {
          return false;
        }
        return true;
      },
      {
        message: "Emails do not match",
        path: ["email_confirmation"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: formValues?.first_name,
      last_name: formValues?.last_name,
      email: formValues?.email,
      email_confirmation: formValues?.email,
      phone_number: formValues?.mobile ? `+94${formValues.mobile}` : "",
      get_updates: formValues?.get_updates ? formValues.get_updates : false,
      image: formValues?.image,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phone = parsePhoneNumber(values.phone_number);
    updateFormValues({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      mobile: phone?.nationalNumber,
      image: values.image,
      get_updates: values.get_updates,
    });
    setCurrentStep((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col items-center justify-center max-md:mt-10">
      <h1 className="text-center text-accent-text">
        What&apos;s the best way for employers to contact you?
      </h1>
      <p className="text-center text-slate-700">
        Communication is key to any job search; let us know your preferred mode for employers to
        connect with you, ensuring a smooth interaction.
      </p>
      <div className="mx-auto mt-20 w-full max-w-7xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 items-start justify-center md:grid-cols-3">
              <div>
                <h3>Contact info</h3>
                <span className="text-sm text-slate-600">Add your contact info.</span>
              </div>
              <div className="w-full max-md:mt-5 md:col-span-2">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-2 space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email confirmation</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="777584512"
                            defaultCountry="LK"
                            maxLength={9}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="get_updates"
                    render={({ field }) => (
                      <FormItem className="flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel> Get updates</FormLabel>
                        </div>
                        <FormDescription>
                          Use this mobile number to get updates via SMS
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            {needImage && (
              <>
                <Separator />
                <div className="grid grid-cols-1 items-start justify-center md:grid-cols-3">
                  <div>
                    <h3>Upload your photo</h3>
                    <span className="text-sm text-slate-600">
                      Click on the image to upload photo
                    </span>
                  </div>
                  <div className="w-full max-md:mt-5 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center justify-start md:items-start">
                          <FormControl>
                            <ImageUpload template_id={formValues?.template_id!} {...field} />
                          </FormControl>
                          <FormMessage className="max-md:text-center" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex w-full justify-between pt-8">
              <Button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                type="button"
                variant={"outline"}
                className="h-12 min-w-24"
              >
                Back
              </Button>
              <Button type="submit" className="h-12 min-w-24">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
