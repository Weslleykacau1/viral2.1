import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  callback: (result: { preview: string; base64: string; type: string; file: File }) => void
) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = reader.result as string;
      if (preview) {
        const base64 = preview.split(',')[1];
        callback({ preview, base64, type: file.type, file });
      }
    };
    reader.readAsDataURL(file);
  }
};
