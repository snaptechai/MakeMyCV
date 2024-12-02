import React from "react";
import { useStepContext } from "@/providers/step-provider";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import Step5 from "./step-5";

export default function ResumeSteps() {
  const { currentStep } = useStepContext();
  return (
    <div>
      {currentStep == 1 && <Step1 />}
      {currentStep == 2 && <Step2 />}
      {currentStep == 3 && <Step3 />}
      {currentStep == 4 && <Step4 />}
      {currentStep == 5 && <Step5 />}
    </div>
  );
}
