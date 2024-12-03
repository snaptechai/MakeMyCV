import { notFound } from "next/navigation";

export const decryptOrderId = async (param: string) => {
  if (!param) {
    notFound();
  }
  let decodedArray;
  try {
    const urlDecoded = decodeURIComponent(param);
    decodedArray = atob(urlDecoded).split("_");
  } catch (e) {
    notFound();
  }

  if (decodedArray.length !== 2) {
    notFound();
  }

  const idPart = decodedArray[0];
  if (idPart.length < 8) {
    notFound();
  }

  const id = idPart.slice(4, -4);

  if (!id || isNaN(Number(id))) {
    notFound();
  }
  return Number(id);
};
