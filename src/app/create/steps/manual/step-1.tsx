import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchInput } from "@/components/ui/search-input";
import { Separator } from "@/components/ui/separator";
import { searchJobPositions } from "@/server/helpers/job-position";
import { searchEnglishJobPosition } from "@/server/helpers/english-job-position";
import { searchCompany } from "@/server/helpers/company";
import { searchSchool } from "@/server/helpers/school";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useStepContext } from "@/providers/step-provider";
import DatePicker from "react-datepicker";
import { getCareerLevel } from "@/server/actions/get-career-level";
import "react-datepicker/dist/react-datepicker.css";

const formSchema = z.object({
  job_position: z.string().min(1, {
    message: "Please enter a job position",
  }),
  employment_history: z.array(
    z
      .object({
        company_name: z.string().min(1, {
          message: "Please enter a company name",
        }),
        position: z.string().min(1, {
          message: "Please enter a position",
        }),
        description: z.string().optional(),
        start_date: z.date({
          required_error: "Please select a date and time",
          invalid_type_error: "That's not a date!",
        }),
        end_date: z
          .date({
            required_error: "Please select a date and time",
            invalid_type_error: "That's not a date!",
          })
          .optional(),
        currently_working: z.boolean(),
      })
      .refine(
        (values) => {
          if (values.currently_working) {
            return true;
          }
          if (!values.currently_working && !values.end_date) {
            return false;
          }
          if (values.end_date && values.end_date <= values.start_date) {
            return false;
          }
          return true;
        },
        {
          message: "End date must be greater than start date",
          path: ["end_date"],
        },
      ),
  ),
  educations: z.array(
    z
      .object({
        school_name: z.string().min(1, {
          message: "Please enter a school name",
        }),
        degree: z.string().min(1, {
          message: "Please enter a degree",
        }),
        degree_completion_date: z
          .date({
            required_error: "Please select a date and time",
            invalid_type_error: "That's not a date!",
          })
          .optional(),
        currently_studying: z.boolean(),
      })
      .refine(
        (values) => {
          if (!values.currently_studying && !values.degree_completion_date) {
            return false;
          }
          return true;
        },
        {
          message: "Please select a degree completion date",
          path: ["degree_completion_date"],
        },
      ),
  ),
  achievements: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Please enter a title",
      }),
      date: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      }),
    }),
  ),
  certifications: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Please enter a title",
      }),
      issuer: z.string().optional(),
      date: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      }),
    }),
  ),
  publications: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Please enter a title",
      }),
      date: z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      }),
      link: z.string().optional().nullable(),
    }),
  ),
});

export default function Step1() {
  const { updateFormValues, setMethod, setCurrentStep, setTemplateParams, formValues } =
    useStepContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_position: formValues?.job_position,
      employment_history: formValues?.employment_history?.map((history) => ({
        ...history,
        description: history?.description ?? undefined,
      })),
      educations: formValues?.educations,
      achievements: formValues?.achievements,
      certifications: formValues?.certifications,
      publications: formValues?.publications,
    },
  });

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany,
  } = useFieldArray({
    control: form.control,
    name: "employment_history",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  const {
    fields: publicationFields,
    append: appendPublication,
    remove: removePublication,
  } = useFieldArray({
    control: form.control,
    name: "publications",
  });

  const {
    fields: achievementFields,
    append: appendAchievement,
    remove: removeAchievement,
  } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  const addNewCompany = async () => {
    const isValid = await form.trigger("employment_history");
    if (isValid) {
      appendCompany({
        company_name: "",
        position: "",
        description: "",
        // @ts-ignore
        end_date: undefined,
        // @ts-ignore
        start_date: undefined,
        currently_working: false,
      });
    }
  };

  const addNewEducation = async () => {
    const isValid = await form.trigger("educations");
    if (isValid) {
      appendEducation({
        school_name: "",
        degree: "",
        // @ts-ignore
        degree_completion_date: undefined,
        currently_studying: false,
      });
    }
  };

  const addNewCertification = async () => {
    const isValid = await form.trigger("certifications");
    if (isValid) {
      appendCertification({
        name: "",
        issuer: "",
        // @ts-ignore
        date: undefined,
      });
    }
  };

  const addNewPublication = async () => {
    const isValid = await form.trigger("publications");
    if (isValid) {
      appendPublication({
        name: "",
        // @ts-ignore
        date: undefined,
        link: "",
      });
    }
  };

  const addNewAchievement = async () => {
    const isValid = await form.trigger("achievements");
    if (isValid) {
      appendAchievement({
        name: "",
        // @ts-ignore
        date: undefined,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let careerLevelData = {
      career_level: formValues?.career_level,
      price: formValues?.price,
    };

    if (!formValues?.career_level || !formValues?.price) {
      const res = await getCareerLevel(values);
      if (!res) {
        return;
      }
      careerLevelData = res;
    }

    updateFormValues({
      job_position: values.job_position,
      employment_history: values.employment_history,
      educations: values.educations,
      achievements: values.achievements,
      certifications: values.certifications,
      publications: values.publications,
      career_level: careerLevelData.career_level,
      price: careerLevelData.price,
    });

    setTemplateParams({
      number_of_employment_history: values.employment_history.length,
      number_of_educations: values.educations.length,
      number_of_achievements: values.achievements.length,
      number_of_certifications: values.certifications.length,
      number_of_publications: values.publications.length,
    });

    setCurrentStep(2);
  }

  const watchCurrentlyWorking = form.watch("employment_history");
  const watchCurrentlyStudying = form.watch("educations");
  return (
    <div className="flex flex-col items-center justify-center max-md:mt-10">
      <h1 className="text-center text-accent-text">Submit your information</h1>
      <p className="text-center text-slate-700">
        By submitting your information, you're one step closer to owning a powerful, custom-made CV.
      </p>
      <div className="mx-auto mt-20 w-full max-w-7xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid items-start md:grid-cols-3">
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

            <Separator />

            {/* Employement history */}

            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Employement history</h3>
                <span className="text-sm text-slate-600">
                  Show your relevant experiences within last 10 years.
                </span>
              </div>
              <div className="w-full max-md:mt-2 md:col-span-2">
                {companyFields.map((field, index) => (
                  <div key={index} className="space-y-8">
                    <FormField
                      control={form.control}
                      name={`employment_history.${index}.company_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comapny name</FormLabel>
                          <FormControl>
                            <SearchInput
                              searchFunction={searchCompany}
                              placeholder="eg: Amazon"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`employment_history.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <SearchInput
                              searchFunction={searchEnglishJobPosition}
                              placeholder="eg: Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`employment_history.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe your role and responsibilities (Optional)</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between gap-5">
                      <FormField
                        control={form.control}
                        name={`employment_history.${index}.start_date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <div>
                                <DatePicker
                                  selected={field.value}
                                  onChange={field.onChange}
                                  dateFormat="MM/yyyy"
                                  showMonthYearPicker
                                  className="w-full rounded-md border border-input p-2 text-sm outline-input"
                                  calendarClassName="rounded-md shadow-lg"
                                  monthClassName={() => "p-2 bg-purple-200"}
                                  yearClassName={() => "p-2 bg-purple-200"}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`employment_history.${index}.end_date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <div>
                                {watchCurrentlyWorking?.[index].currently_working ? (
                                  <span className="text-sm text-slate-600">Present</span>
                                ) : (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={field.onChange}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    className="w-full rounded-md border border-input p-2 text-sm outline-input"
                                    calendarClassName="rounded-md shadow-lg"
                                    monthClassName={() => "p-2 bg-purple-200"}
                                    yearClassName={() => "p-2 bg-purple-200"}
                                  />
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`employment_history.${index}.currently_working`}
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-end">
                            <div className="flex items-center justify-center">
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="ml-2">I am currently working here</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        className="h-9 text-red-400 hover:text-red-500"
                        type="button"
                        variant={"outline"}
                        onClick={() => removeCompany(index)}
                      >
                        <TrashIcon size={16} className="mr-2" />
                        Remove Company
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-6 h-9 text-accent-1 hover:text-primary"
                  type="button"
                  variant={"outline"}
                  onClick={addNewCompany}
                >
                  <PlusIcon size={16} className="mr-2" />
                  Add Company
                </Button>
              </div>
            </div>

            <Separator />

            {/* Education */}

            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Education</h3>
                <span className="text-sm text-slate-600">Add your educational details.</span>
              </div>
              <div className="w-full max-md:mt-2 md:col-span-2">
                {educationFields.map((field, index) => (
                  <div key={index} className="space-y-8">
                    <FormField
                      control={form.control}
                      name={`educations.${index}.school_name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School/College/University</FormLabel>
                          <FormControl>
                            <SearchInput
                              searchFunction={searchSchool}
                              placeholder="eg: Colombo International School"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`educations.${index}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree/Qualification </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Bachelor in Business Administration"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between gap-5">
                      <FormField
                        control={form.control}
                        name={`educations.${index}.degree_completion_date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Degree completion date</FormLabel>
                            <FormControl>
                              <div>
                                {watchCurrentlyStudying?.[index].currently_studying ? (
                                  <span className="text-sm text-slate-600">Present</span>
                                ) : (
                                  <DatePicker
                                    selected={field.value}
                                    onChange={field.onChange}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    className="w-full rounded-md border border-input p-2 text-sm outline-input"
                                    calendarClassName="rounded-md shadow-lg"
                                    monthClassName={() => "p-2 bg-purple-200"}
                                    yearClassName={() => "p-2 bg-purple-200"}
                                  />
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`educations.${index}.currently_studying`}
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-end">
                            <div className="flex items-center justify-center">
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="ml-2">I am currently studying here</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        className="h-9 text-red-400 hover:text-red-500"
                        type="button"
                        variant={"outline"}
                        onClick={() => removeEducation(index)}
                      >
                        <TrashIcon size={16} className="mr-2" />
                        Remove School
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-6 h-9 text-accent-1 hover:text-primary"
                  type="button"
                  variant={"outline"}
                  onClick={addNewEducation}
                >
                  <PlusIcon size={16} className="mr-2" />
                  Add School
                </Button>
              </div>
            </div>

            <Separator />

            {/* Achivement / Awards */}

            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Achivement / Awards</h3>
                <span className="text-sm text-slate-600">If any</span>
              </div>
              <div className="w-full max-md:mt-2 md:col-span-2">
                {achievementFields.map((field, index) => (
                  <div key={index} className="space-y-8">
                    <FormField
                      control={form.control}
                      name={`achievements.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Achivement / award</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. FinTech" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`achievements.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div>
                              <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                className="w-full rounded-md border border-input p-2 text-sm outline-input"
                                calendarClassName="rounded-md shadow-lg"
                                monthClassName={() => "p-2 bg-purple-200"}
                                yearClassName={() => "p-2 bg-purple-200"}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        className="h-9 text-red-400 hover:text-red-500"
                        type="button"
                        variant={"outline"}
                        onClick={() => removeAchievement(index)}
                      >
                        <TrashIcon size={16} className="mr-2" />
                        Remove Achivement
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-6 h-9 text-accent-1 hover:text-primary"
                  type="button"
                  variant={"outline"}
                  onClick={addNewAchievement}
                >
                  <PlusIcon size={16} className="mr-2" />
                  Add Achivement
                </Button>
              </div>
            </div>

            <Separator />

            {/* Certifications / Licenses */}

            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Certifications / Licenses</h3>
                <span className="text-sm text-slate-600">If any</span>
              </div>
              <div className="w-full max-md:mt-2 md:col-span-2">
                {certificationFields.map((field, index) => (
                  <div key={index} className="space-y-8">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="e.g. Microsoft cerified network associate security"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.issuer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuer</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. Microsoft" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div>
                              <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                className="w-full rounded-md border border-input p-2 text-sm outline-input"
                                calendarClassName="rounded-md shadow-lg"
                                monthClassName={() => "p-2 bg-purple-200"}
                                yearClassName={() => "p-2 bg-purple-200"}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        className="h-9 text-red-400 hover:text-red-500"
                        type="button"
                        variant={"outline"}
                        onClick={() => removeCertification(index)}
                      >
                        <TrashIcon size={16} className="mr-2" />
                        Remove Certification
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-6 h-9 text-accent-1 hover:text-primary"
                  type="button"
                  variant={"outline"}
                  onClick={addNewCertification}
                >
                  <PlusIcon size={16} className="mr-2" />
                  Add Certification
                </Button>
              </div>
            </div>

            <Separator />

            {/* Publications */}

            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Publication</h3>
                <span className="text-sm text-slate-600">If any link</span>
              </div>
              <div className="w-full max-md:mt-2 md:col-span-2">
                {publicationFields.map((field, index) => (
                  <div key={index} className="space-y-8">
                    <FormField
                      control={form.control}
                      name={`publications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of the pulication</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. FinTech" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`publications.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div>
                              <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                className="w-full rounded-md border border-input p-2 text-sm outline-input"
                                calendarClassName="rounded-md shadow-lg"
                                monthClassName={() => "p-2 bg-purple-200"}
                                yearClassName={() => "p-2 bg-purple-200"}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`publications.${index}.link`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ""} placeholder="https://" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        className="h-9 text-red-400 hover:text-red-500"
                        type="button"
                        variant={"outline"}
                        onClick={() => removePublication(index)}
                      >
                        <TrashIcon size={16} className="mr-2" />
                        Remove Publication
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-6 h-9 text-accent-1 hover:text-primary"
                  type="button"
                  variant={"outline"}
                  onClick={addNewPublication}
                >
                  <PlusIcon size={16} className="mr-2" />
                  Add Publication
                </Button>
              </div>
            </div>
            <div className="flex w-full justify-between pt-8">
              <Button
                onClick={() => setMethod(undefined)}
                type="button"
                variant={"outline"}
                className="h-12 min-w-24"
              >
                Back
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="h-12 min-w-24"
              >
                {form.formState.isSubmitting && (
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
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
