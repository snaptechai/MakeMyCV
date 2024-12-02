import React, { useState } from "react";
import { useStepContext } from "@/providers/step-provider";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { submitInfo } from "@/server/actions/submit-info";

export default function ReviewDetails() {
  const [error, setError] = useState<string | null>("");
  const [pending, setPending] = useState(false);
  const { formValues, setCurrentStep } = useStepContext();

  const onSubmit = async () => {
    setPending(true);
    const res = await submitInfo(formValues!);
    if (res) {
      setError(res.error);
    }
    setPending(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-md:mt-10">
      <h1 className="text-center text-accent-text">Let's review one more time</h1>
      <p className="text-center text-slate-700">
        To ensure your CV accurately represents you, let's perform one last review to fine-tune the
        details.
      </p>
      <div className="mx-auto mt-20 w-full max-w-7xl space-y-8">
        <div className="grid items-start md:grid-cols-3">
          <div>
            <h3>Target job position</h3>
          </div>
          <div className="w-full max-md:mt-1 md:col-span-2">
            <input
              type="text"
              value={formValues?.job_position || ""}
              disabled
              className="w-full rounded-md border border-input p-2 text-sm outline-input"
            />
          </div>
        </div>

        {formValues?.employment_history && formValues?.employment_history.length !== 0 && (
          <>
            <Separator />
            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Employment History</h3>
                <span className="text-sm text-slate-600">
                  Show your relevant experiences within last 10 years.
                </span>
              </div>
              <div className="w-full space-y-8 max-md:mt-2 md:col-span-2">
                {formValues.employment_history.map((history, index) => (
                  <div key={index} className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Company name
                      </label>
                      <input
                        type="text"
                        value={history.company_name}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <input
                        type="text"
                        value={history.position}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={history.description ?? undefined}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    <div className="flex gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={moment(history.start_date).format("MM/YYYY")}
                          disabled
                          className="w-full rounded-md border border-input p-2 text-sm outline-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="text"
                          value={
                            history.currently_working
                              ? "Present"
                              : moment(history.end_date).format("MM/YYYY")
                          }
                          disabled
                          className="w-full rounded-md border border-input p-2 text-sm outline-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {formValues?.educations && formValues?.educations.length !== 0 && (
          <>
            <Separator />
            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Education</h3>
                <span className="text-sm text-slate-600">Add your educational details.</span>
              </div>
              <div className="w-full space-y-8 max-md:mt-2 md:col-span-2">
                {formValues.educations.map((education, index) => (
                  <div key={index} className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        School/College/University
                      </label>
                      <input
                        type="text"
                        value={education.school_name}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Degree/Qualification
                      </label>
                      <input
                        type="text"
                        value={education.degree}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    <div className="flex gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Degree completion date
                        </label>
                        <input
                          type="text"
                          value={
                            education.currently_studying
                              ? "Present"
                              : moment(education.degree_completion_date).format("MM/YYYY")
                          }
                          disabled
                          className="w-full rounded-md border border-input p-2 text-sm outline-input"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {formValues?.achievements && formValues?.achievements.length !== 0 && (
          <>
            <Separator />
            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Achievements / Awards</h3>
                <span className="text-sm text-slate-600">If any</span>
              </div>
              <div className="w-full space-y-8 max-md:mt-2 md:col-span-2">
                {formValues.achievements.map((achievement, index) => (
                  <div key={index} className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name of Achievement / Award
                      </label>
                      <input
                        type="text"
                        value={achievement.name}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    {achievement.date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="text"
                          value={moment(achievement.date).format("MM/YYYY")}
                          disabled
                          className="w-full rounded-md border border-input p-2 text-sm outline-input"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {formValues?.certifications && formValues?.certifications.length !== 0 && (
          <>
            <Separator />
            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Certifications / Licenses</h3>
                <span className="text-sm text-slate-600">If any</span>
              </div>
              <div className="w-full space-y-8 max-md:mt-2 md:col-span-2">
                {formValues.certifications.map((certification, index) => (
                  <div key={index} className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={certification.name}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issuer</label>
                      <input
                        type="text"
                        value={certification.issuer}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    {certification.date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="text"
                          value={moment(certification.date).format("MM/YYYY")}
                          disabled
                          className="w-full rounded-md border border-input p-2 text-sm outline-input"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {formValues?.publications && formValues?.publications.length !== 0 && (
          <>
            <Separator />
            <div className="grid items-start md:grid-cols-3">
              <div>
                <h3>Publications</h3>
                <span className="text-sm text-slate-600">If any link</span>
              </div>
              <div className="w-full space-y-8 max-md:mt-2 md:col-span-2">
                {formValues.publications.map((publication, index) => (
                  <div key={index} className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name of the publication
                      </label>
                      <input
                        type="text"
                        value={publication.name}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                    {publication.date && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                          type="text"
                          value={moment(publication.date).format("MM/YYYY")}
                          disabled
                          className="w-full rounded-md border border-input p-2 text-sm outline-input"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Link</label>
                      <input
                        type="text"
                        value={publication.link ?? ""}
                        disabled
                        className="w-full rounded-md border border-input p-2 text-sm outline-input"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div>{error && <p className="text-red-500">{error}</p>}</div>
        <div className="flex w-full justify-between pt-8">
          <Button onClick={() => setCurrentStep(1)} variant={"outline"} className="h-12 min-w-24">
            Edit
          </Button>
          <Button disabled={pending} className="h-12 min-w-24" onClick={onSubmit}>
            {pending && (
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
            Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
