"use server";

import moment from "moment";
import { FormValues } from "@/providers/step-provider";
import axios from "axios";
import { redirect } from "next/navigation";

type SubmitInfoResponse = {
  result: string;
  msg: string;
  i: string;
};

export const submitInfo = async (values: FormValues) => {
  const formData = new FormData();
  formData.append("template", `${values.template_id}`);
  formData.append("career_level", `${values.career_level}`);
  formData.append("job_industry", values.job_industry || "");
  formData.append("job_position", values.job_position || "");
  formData.append("first_name", values.first_name || "");
  formData.append("last_name", values.last_name || "");
  formData.append("email", values.email || "");
  formData.append("mobile", values.mobile || "");
  formData.append("country", "+94_-_Sri Lanka");
  formData.append("location", "MMCV");
  formData.append("get_updates", values.get_updates ? "1" : "0");
  values.employment_history?.forEach((employment, index) => {
    formData.append(`employement[${index}][company_name]`, employment.company_name || "");
    formData.append(`employement[${index}][position]`, employment.position || "");
    formData.append(
      `employement[${index}][start_date]`,
      employment.start_date ? moment(employment.start_date).format("MM/YYYY") : "",
    );
    formData.append(
      `employement[${index}][end_date]`,
      employment.end_date ? moment(employment.end_date).format("MM/YYYY") : "",
    );
    formData.append(
      `employement[${index}][currently_working]`,
      employment.currently_working ? "1" : "0",
    );
    formData.append(`employement[${index}][job_duties]`, employment.description || "");
  });
  values.educations?.forEach((education, index) => {
    formData.append(`education[${index}][school_name]`, education.school_name || "");
    formData.append(`education[${index}][degree]`, education.degree || "");
    formData.append(`education[${index}][field_of_study]`, "");
    formData.append(
      `education[${index}][school_end_date]`,
      education.degree_completion_date
        ? moment(education.degree_completion_date).format("MM/YYYY")
        : "",
    );
    formData.append(
      `education[${index}][currently_stdying]`,
      education.currently_studying ? "1" : "0",
    );
  });
  values.achievements?.forEach((award, index) => {
    formData.append(`awards[${index}][award_name]`, award.name || "");
    formData.append(
      `awards[${index}][award_date]`,
      award.date ? moment(award.date).format("MM/YYYY") : "",
    );
  });
  values.certifications?.forEach((certificate, index) => {
    formData.append(`certificates[${index}][cert_name]`, certificate.name || "");
    formData.append(`certificates[${index}][cert_org]`, certificate.issuer || "");
    formData.append(
      `certificates[${index}][cert_date]`,
      certificate.date ? moment(certificate.date).format("MM/YYYY") : "",
    );
  });
  values.publications?.forEach((publication, index) => {
    formData.append(`publications[${index}][pub_name]`, publication.name || "");
    formData.append(`publications[${index}][pub_link]`, publication.link || "");
    formData.append(
      `publications[${index}][pub_date]`,
      publication.date ? moment(publication.date).format("MM/YYYY") : "",
    );
  });
  const imageName = values.image ? values.image.split("/").pop() : "";
  formData.append("image", imageName || "");

  const { data, status } = await axios.post<SubmitInfoResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/web/index.php?r=cv/add",
    formData,
  );
  if (status === 200 && data.result === "ok") {
    redirect(`/payment/${data.i}`);
  }
  if (data.result === "error") {
    return {
      error: data.msg,
    };
  }
  return {
    error: "Something went wrong",
  };
};
