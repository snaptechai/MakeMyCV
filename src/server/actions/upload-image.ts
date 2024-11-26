"use server";

import axios from "axios";

type UploadImageResponse = {
  image_path: string;
  image_name: string;
};

export const uploadImage = async (file: string, template_id: number) => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("crop_image_name	", "");
  formData.append("template", template_id.toString());
  const { data, status } = await axios.post<UploadImageResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/web/index.php?r=cv/uploadimage",
    formData,
  );
  if (status === 200) {
    return data;
  }
  return null;
};
