import React from "react";
import { useStepContext } from "@/providers/step-provider";
import { Button } from "@/components/ui/button";
import StepperNavigation from "./navigation";
import LinkedInSteps from "./linkedin";
import ManualSteps from "./manual";
import ResumeSteps from "./resume";

export default function SelectMethod() {
  const { method, setMethod } = useStepContext();
  return (
    <>
      <StepperNavigation />
      <div className="mt-8 px-5 md:mt-24">
        {!method && (
          <div className="flex flex-col items-center justify-center !pt-20">
            <h1 className="text-center text-accent-text">Select a method to start your journey.</h1>
            <p className="!mt-8 text-center text-slate-600">
              Choose a convenient option to kickstart your professional CV creation. Whether you
              prefer manual input, LinkedIn import, or uploading an existing CV, we've got you
              covered!
            </p>

            <div className="mt-32 flex max-w-8xl flex-wrap justify-center gap-20">
              <div className="flex max-w-sm flex-col text-center">
                <h3 className="text-xl font-bold">Upload Your CV</h3>
                <span className="mt-5 text-xs text-slate-600">
                  Already have a CV? Upload it, and we&apos;ll extract the information to craft a
                  new CV using our professionally designed templates.
                </span>
                <div className="flex h-full w-full items-end justify-center">
                  <Button onClick={() => setMethod("resume")} className="mt-2 w-full">
                    Start
                  </Button>
                </div>
              </div>
              {/* <div className="flex max-w-sm flex-col text-center">
                <h3 className="text-xl font-bold">Quick Import from LinkedIn</h3>
                <span className="mt-5 text-xs text-slate-600">
                  Save time by importing your LinkedIn profile. We'll automatically extract your
                  professional data and populate it into a polished CV template.
                </span>
                <div className="flex h-full w-full items-end justify-center">
                  <Button onClick={() => setMethod("linkedin")} className="mt-2 w-full">
                    Start
                  </Button>
                </div>
              </div> */}
              <div className="flex max-w-sm flex-col text-center">
                <h3 className="text-xl font-bold">Build from Scratch</h3>
                <span className="mt-5 text-xs text-slate-600">
                  Take full control by manually entering your details. Customize every section to
                  create a CV that reflects your unique experiences and skills.
                </span>
                <div className="flex h-full w-full items-end justify-center">
                  <Button onClick={() => setMethod("manual")} className="mt-2 w-full">
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {method && (
          <Button onClick={() => setMethod(undefined)} variant={"link"}>
            Start again?
          </Button>
        )}
        {method === "linkedin" && <LinkedInSteps />}
        {method === "resume" && <ResumeSteps />}
        {method === "manual" && <ManualSteps />}
      </div>
    </>
  );
}
