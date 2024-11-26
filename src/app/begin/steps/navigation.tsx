import React from "react";
import Image from "next/image";
import { useStepContext } from "@/providers/step-provider";

// Images
import Logo from "@/../public/img/logo.svg";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

const manualPaths = [
  {
    step: 1,
    title: "Fill in your details",
  },
  {
    step: 2,
    title: "Choose a template",
  },
  {
    step: 3,
    title: "Contact Info",
  },
  {
    step: 4,
    title: "Review",
  },
  {
    step: 5,
    title: "Payment",
  },
];

const linkedInPaths = [
  {
    step: 1,
    title: "LinkedIn Profile",
  },
  {
    step: 2,
    title: "Contact Information",
  },
  {
    step: 3,
    title: "Review",
  },
  {
    step: 4,
    title: "Payment",
  },
];

const resumePaths = [
  {
    step: 1,
    title: "Upload Resume",
  },
  {
    step: 2,
    title: "Edit Resume",
  },
  {
    step: 3,
    title: "Choose a template",
  },
  {
    step: 4,
    title: "Contact Information",
  },
  {
    step: 5,
    title: "Payment",
  },
];

export default function StepperNavigation() {
  const { method, currentStep } = useStepContext();

  const getPaths = (method: any) => {
    switch (method) {
      case "manual":
        return manualPaths;
      case "linkedin":
        return linkedInPaths;
      case "resume":
        return resumePaths;
      default:
        return [];
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 top-0 z-50 flex h-20 w-full items-center justify-center border-b bg-white px-10",
        currentStep < 3 && "max-sm:justify-start",
        !method && "justify-center",
      )}
    >
      <Link href="/">
        <Image className={cn("mr-5 lg:flex", method && "hidden")} src={Logo} alt="Logo" />
      </Link>
      {method && (
        <div className="mx-10 flex items-center">
          {getPaths(method).map((path, index) => (
            <div key={path.step} className="flex h-full w-full items-center">
              <div
                className={cn(
                  "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full transition-transform duration-300",
                  currentStep == path.step
                    ? "scale-110 bg-primary text-white"
                    : "scale-100 bg-gray-300 text-gray-500",
                  currentStep > path.step && "bg-primary",
                )}
              >
                {currentStep > path.step ? <CheckIcon className="h-5 w-5 text-white" /> : path.step}
              </div>
              {currentStep == path.step && (
                <span className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-slate-700">
                  {path.title}
                </span>
              )}
              {index < getPaths(method).length - 1 && (
                <div className="mx-1 h-0.5 bg-gray-300 sm:w-6 md:mx-2 md:w-8 lg:w-16 xl:w-20 2xl:w-24"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
