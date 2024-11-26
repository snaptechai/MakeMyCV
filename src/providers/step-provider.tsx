import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import { getTemplatesWithParams } from "@/server/helpers/template";

type Methods = "manual" | "linkedin" | "resume" | undefined;

interface TemplateParams {
  number_of_employment_history: number;
  number_of_educations: number;
  number_of_achievements: number;
  number_of_publications: number;
  number_of_certifications: number;
}

interface StepValuesType {
  formValues: FormValues | undefined;
  updateFormValues: (updatedData: FormValues) => void;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  method: Methods;
  setMethod: Dispatch<SetStateAction<Methods>>;
  clearAllValues: () => void;
  setTemplateParams: (params: TemplateParams) => void;
  suggestedTemplates: Awaited<ReturnType<typeof getTemplatesWithParams>> | undefined;
  setSuggestedTemplates: Dispatch<
    SetStateAction<Awaited<ReturnType<typeof getTemplatesWithParams>> | undefined>
  >;
  setNeedImage: Dispatch<SetStateAction<boolean>>;
  needImage: boolean;
}

interface Props {
  children: React.ReactNode;
}

const StepContext = createContext<StepValuesType | null>(null);

export const StepProvider = ({ children }: Props) => {
  const [formValues, setFormValues] = useState<FormValues | undefined>();

  const [currentStep, setCurrentStep] = useState(1);

  const [method, setMethod] = useState<Methods>(undefined);

  const [templateParams, setTemplateParams] = useState<TemplateParams | undefined>(undefined);

  const [suggestedTemplates, setSuggestedTemplates] =
    useState<Awaited<ReturnType<typeof getTemplatesWithParams>>>();

  const [needImage, setNeedImage] = useState(false);

  const updateFormValues = (updatedData: FormValues) => {
    setFormValues((prevData) => ({ ...prevData, ...updatedData }));
  };

  const handlePopState = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else if (method) {
      setMethod(undefined);
    } else {
      history.back();
    }
  };

  useEffect(() => {
    history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep, method]);

  const clearAllValues = () => {
    setFormValues(undefined);
    setSuggestedTemplates(undefined);
    setCurrentStep(1);
  };

  useEffect(() => {
    clearAllValues();
  }, [method]);

  useEffect(() => {
    if (templateParams) {
      const fetchSuggestedTemplates = async () => {
        const templates = await getTemplatesWithParams(templateParams);
        setSuggestedTemplates(templates);
      };
      fetchSuggestedTemplates();
    }
  }, [templateParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const values: StepValuesType = {
    formValues,
    updateFormValues,
    currentStep,
    setCurrentStep,
    method,
    setMethod,
    clearAllValues,
    setTemplateParams,
    suggestedTemplates,
    setSuggestedTemplates,
    setNeedImage,
    needImage,
  };

  return <StepContext.Provider value={values}>{children}</StepContext.Provider>;
};

export const useStepContext = () => {
  const context = useContext(StepContext);
  if (context === null) {
    throw new Error("context must be used within the context provider");
  }
  return context;
};

export type FormValues = {
  template_id?: number;
  career_level?: number;
  job_industry?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile?: string;
  // +94_-_Sri Lanka
  country?: string;
  // MMCV
  location?: string;
  get_updates?: boolean;
  image?: string;
  job_position?: string;
  price?: number;
  employment_history?: {
    company_name: string;
    position: string;
    description?: string | null;
    start_date: Date;
    end_date?: Date;
    currently_working: boolean;
  }[];
  educations?: {
    school_name: string;
    degree: string;
    degree_completion_date?: Date;
    currently_studying: boolean;
  }[];
  achievements?: {
    name: string;
    date: Date;
  }[];
  certifications?: {
    name: string;
    issuer?: string;
    date: Date;
  }[];
  publications?: {
    name: string;
    date: Date;
    link?: string | null;
  }[];
};
