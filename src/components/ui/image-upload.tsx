"use client";

import React, { type SyntheticEvent } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { CropIcon, Trash2Icon } from "lucide-react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { uploadImage } from "@/server/actions/upload-image";
import "react-image-crop/dist/ReactCrop.css";

type FileWithPreview = FileWithPath & {
  preview: string;
};

const accept = {
  "image/*": [],
};
type ImageUploadProps = {
  template_id: number;
  value?: string;
  onChange?: (value: string) => void;
};

export function ImageUpload({ template_id, value, onChange }: ImageUploadProps) {
  const aspect = template_id === 8 ? 211 / 281 : template_id === 13 ? 115 / 375 : 1;
  const [selectedFile, setSelectedFile] = React.useState<FileWithPreview | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    const preview = URL.createObjectURL(file);
    setSelectedFile({ ...file, preview });
    setDialogOpen(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onCropComplete(crop: PixelCrop) {
    if (imgRef.current && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(croppedImageUrl);
    }
  }

  function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY,
      );
    }

    return canvas.toDataURL("image/png", 1.0);
  }

  async function onCrop() {
    try {
      const res = await uploadImage(croppedImageUrl, template_id);
      if (res) {
        setImageUrl(res.image_path);
        setDialogOpen(false);
      }
    } catch (error) {
      alert("Error uploading image");
    }
  }

  React.useEffect(() => {
    if (imageUrl && onChange) {
      onChange(imageUrl);
    }
  }, [imageUrl]);

  React.useEffect(() => {
    if (value) {
      setImageUrl(value);
    }
  }, [value]);

  return (
    <div>
      {!imageUrl ? (
        <div {...getRootProps()} className="flex flex-col items-center justify-center">
          <input {...getInputProps()} />
          <img src="/img/form/upload.gif" alt="upload" className="h-28 w-28 hover:cursor-pointer" />
          <Button type="button">Select an Image</Button>
        </div>
      ) : (
        <div className="relative mt-5 flex size-44 h-full flex-col items-center justify-center">
          <img
            src={process.env.NEXT_PUBLIC_BACKEND_URL + imageUrl}
            alt="Cropped Image"
            className="border shadow-md"
          />
          <Button
            size={"sm"}
            onClick={() => setImageUrl("")}
            variant={"destructive"}
            className="mt-2"
            type="button"
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="gap-0 p-0">
          <div className="size-full p-6">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => onCropComplete(c)}
              aspect={aspect}
              className="w-full"
            >
              <Avatar className="size-full rounded-none">
                <AvatarImage
                  ref={imgRef}
                  className="size-full rounded-none"
                  alt="Image Cropper Shell"
                  src={selectedFile?.preview}
                  onLoad={onImageLoad}
                />
                <AvatarFallback className="size-full min-h-[460px] rounded-none">
                  Loading...
                </AvatarFallback>
              </Avatar>
            </ReactCrop>
          </div>
          <DialogFooter className="justify-center p-6 pt-0">
            <DialogClose asChild>
              <Button
                size={"sm"}
                type="reset"
                className="w-fit"
                variant={"outline"}
                onClick={() => {
                  setSelectedFile(null);
                }}
              >
                <Trash2Icon className="mr-1.5 size-4" />
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size={"sm"} className="w-fit" onClick={onCrop}>
              <CropIcon className="mr-1.5 size-4" />
              Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
