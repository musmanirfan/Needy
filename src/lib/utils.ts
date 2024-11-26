import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
function twMerge(arg0: string) {
  throw new Error("Function not implemented.")
  console.log(arg0);
  
}

