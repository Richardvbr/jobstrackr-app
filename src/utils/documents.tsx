import { ReactNode } from "react";
import { BsFiletypeDoc, BsFiletypeDocx, BsFiletypePdf } from "@/components/icons";

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFileExtension(fileType: string) {
  return fileType.split("/")[1];
}

export const fileTypeIcons: { [key: string]: ReactNode } = {
  doc: <BsFiletypeDoc />,
  docx: <BsFiletypeDocx />,
  pdf: <BsFiletypePdf />,
};
