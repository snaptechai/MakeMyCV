"use client";

import { FileText, TrashIcon, UploadCloud } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { Button } from "./button";
import { uploadResume } from "@/server/actions/upload-resume";

type SuccessfulReturnType = Awaited<ReturnType<typeof uploadResume>>;

export default function FileUpload({
  onSuccessfulUpload,
}: {
  onSuccessfulUpload?: (data: SuccessfulReturnType) => void;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<SuccessfulReturnType | undefined>();

  useEffect(() => {
    if (uploadResponse && onSuccessfulUpload) {
      onSuccessfulUpload(uploadResponse);
    }
  }, [uploadResponse]);

  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const acceptedFile = acceptedFiles[0];
    setIsUploading(true);
    setFileToUpload(acceptedFile);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("resume", acceptedFile);

    try {
      const response = await uploadResume(formData);
      setError(null);
      setUploadResponse(response);
      setUploadedFile(acceptedFile);
    } catch (error) {
      setError("Error uploading the file. Please try again.");
      setUploadedFile(undefined);
    } finally {
      setIsUploading(false);
      setFileToUpload(undefined);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-6 hover:bg-gray-100"
        >
          <div className="text-center">
            <div className="mx-auto max-w-min rounded-md border p-2">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;PDF/DOCX only, files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept=".pdf,.docx"
          type="file"
          className="hidden"
        />
      </div>

      {isUploading && (
        <div className="mt-4 text-center text-sm text-gray-600">
          <svg className="mr-3 inline-block h-5 w-5 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Uploading the file, please wait...
        </div>
      )}
      {error && <div className="mt-4 text-center text-sm text-red-500">{error}</div>}

      {fileToUpload && (
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">
            Uploading: {fileToUpload.name}
          </p>
          <div className="relative pt-1">
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="flex flex-col justify-center whitespace-nowrap bg-primary text-center text-white shadow-none"
              ></div>
            </div>
            <p className="text-xs text-gray-500">{uploadProgress}%</p>
          </div>
        </div>
      )}

      {uploadedFile && (
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">Uploaded File</p>
          <div className="mt-1 flex items-center justify-between rounded border p-2">
            <div className="flex items-center justify-center">
              <FileText size={20} />
              <span className="ml-2">{uploadedFile.name}</span>
            </div>
            <Button
              onClick={() => setUploadedFile(undefined)}
              size={"icon"}
              variant={"destructive"}
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
