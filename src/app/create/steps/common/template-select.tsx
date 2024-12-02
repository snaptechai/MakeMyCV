import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useStepContext } from "@/providers/step-provider";

export default function TemplateSelect() {
  const { suggestedTemplates, setCurrentStep, updateFormValues, formValues, setNeedImage } =
    useStepContext();
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center max-md:mt-10">
      <h1 className="text-center text-accent-text">Select your favourite CV template</h1>
      <p className="text-center text-slate-600">
        Pick your favorite CV template that best aligns with your profession.
      </p>

      {formValues?.price && (
        <span className="mt-2 rounded-3xl bg-secondary/50 px-5 py-2 text-primary">
          Rs. {formValues?.price} =
        </span>
      )}

      {!suggestedTemplates ? (
        <div
          className="text-surface my-20 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      ) : (
        <Carousel
          opts={{
            loop: true,
          }}
          className="mt-10 w-full"
        >
          <CarouselContent className="-ml-1 w-full max-w-9xl">
            {suggestedTemplates.map((template, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-5">
                  <Card
                    className={cn(
                      "group aspect-[0.74/1] hover:border hover:border-accent-1",
                      formValues?.template_id === template.id && "border border-accent-1",
                    )}
                  >
                    <CardContent className="relative flex h-full items-center justify-center overflow-y-hidden">
                      <div className="absolute top-0 z-30 mt-1 h-full">
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/web/images/uploads/template/${template.image}`}
                        />
                      </div>
                      <div className="absolute inset-0 h-full w-full items-center justify-center hover:cursor-pointer">
                        <div
                          className={cn(
                            "absolute inset-0 z-40 hidden h-full w-full bg-primary/15 group-hover:flex",
                            formValues?.template_id === template.id && "flex",
                          )}
                        ></div>
                        <div
                          className={cn(
                            "absolute inset-0 z-50 flex items-center justify-center group-hover:flex",
                            formValues?.template_id === template.id && "flex",
                            formValues?.template_id !== template.id && "xl:hidden",
                          )}
                        >
                          <Button
                            onClick={() => {
                              updateFormValues({ template_id: template.id });
                              setNeedImage(template.withOrWithoutPhoto === "With");
                            }}
                            className="hover:bg-primary"
                          >
                            {formValues?.template_id === template.id ? (
                              <div className="flex items-center justify-center">
                                <CheckIcon className="mr-2 h-4 w-4" />
                                <div>Selected</div>
                              </div>
                            ) : (
                              "Use this template"
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <h4 className="my-2 px-3 text-lg font-semibold">{template.title}</h4>
                <div className="flex flex-wrap gap-1 px-3 text-xs">
                  {template.detailed_tags.map((tag) => (
                    <span
                      key={tag.tag}
                      style={{
                        backgroundColor: tag.background_color,
                        color: tag.text_color,
                      }}
                      className="rounded-xl px-3 py-1"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute bg-primary text-white hover:bg-accent-1 hover:text-white max-xl:ml-8" />
          <CarouselNext className="absolute bg-primary text-white hover:bg-accent-1 hover:text-white max-2xl:mr-8" />
        </Carousel>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-10 flex w-full justify-between md:mt-16">
        <Button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          type="button"
          variant={"outline"}
          className="h-12 min-w-24"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            if (formValues?.template_id) {
              setError(null);
              setCurrentStep((prev) => prev + 1);
            } else {
              setError("Please select a template.");
            }
          }}
          className="h-12 min-w-24"
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
