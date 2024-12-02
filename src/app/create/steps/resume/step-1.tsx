import React from "react";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import { useStepContext } from "@/providers/step-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SearchInput } from "@/components/ui/search-input";
import { searchJobPositions } from "@/server/helpers/job-position";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  job_position: z.string().min(1, {
    message: "Please enter a job position",
  }),
});

export default function Step1() {
  const { setSuggestedTemplates, setMethod, setCurrentStep, updateFormValues, formValues } =
    useStepContext();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_position: formValues?.job_position,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (formValues?.career_level) {
      setError(null);
    } else {
      setError("Please upload a file.");
      return;
    }

    updateFormValues({
      job_position: values.job_position,
    });
    setCurrentStep(2);
  }

  return (
    <div className="flex flex-col items-center justify-center max-md:mt-10">
      <h1 className="text-center text-accent-text">Upload Your CV</h1>
      <p className="text-center text-slate-700">
        Please upload your CV to get started. We will analyze your CV and suggest templates that
        best match your profile.
      </p>
      <div className="mt-10 w-full justify-center px-5 md:px-10">
        <FileUpload
          onSuccessfulUpload={(e) => {
            setSuggestedTemplates(e.templates);
            updateFormValues({
              educations: e.extracted_information.educations,
              employment_history: e.extracted_information.employment_history,
              achievements: e.extracted_information.achievements,
              certifications: e.extracted_information.certifications,
              publications: e.extracted_information.publications,
              career_level: e.career_level,
              price: e.price,
              first_name: e.extracted_information.first_name,
              last_name: e.extracted_information.last_name,
              email: e.extracted_information.email,
              mobile: e.extracted_information.mobile,
            });
            setError(null);
          }}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Separator className="my-10" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 px-5 md:px-10">
          <div className="grid items-center md:grid-cols-3">
            <div>
              <h3>Target job position</h3>
            </div>
            <div className="w-full max-md:mt-1 md:col-span-2">
              <FormField
                control={form.control}
                name="job_position"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SearchInput
                        searchFunction={searchJobPositions}
                        placeholder="eg: Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-between pt-10 md:pt-20">
            <Button
              onClick={() => setMethod(undefined)}
              type="button"
              variant={"outline"}
              className="h-12 min-w-24"
            >
              Back
            </Button>
            <Button className="h-12 min-w-24" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
