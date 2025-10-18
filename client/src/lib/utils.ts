import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fileToBase64 = (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);

    reader.onloadend = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e.target?.error);
  });
};
