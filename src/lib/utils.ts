import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface signUpType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phoneNumber: string;
}
export interface loginType {
  email: string;
  password: string;
}

export const SignUpFormSchema = z
  .object({
    firstName: z.string().min(4).max(10),
    lastName: z.string().min(4).max(10),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
    email: z
      .string()
      .email("Invalid email format")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,10}$/, "Enter a valid phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
});


export const getEmail = (): string | null => {
  const formDataString = localStorage.getItem("formData");
  if (formDataString) {
    try {
      const parsedFormData = JSON.parse(formDataString);
      console.log("Parsed Form Data:", parsedFormData);
      return parsedFormData?.User?.email || null;
    } catch (error) {
      console.error("Error parsing formData JSON:", error);
      return null;
    }
  } else {
    console.log("No formData found in localStorage");
    return null;
  }
};