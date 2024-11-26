"use client";

import React from "react";
import SelectMethod from "./select";
import { StepProvider } from "@/providers/step-provider";

export default function Stepper() {
  return (
    <StepProvider>
      <SelectMethod />
    </StepProvider>
  );
}
