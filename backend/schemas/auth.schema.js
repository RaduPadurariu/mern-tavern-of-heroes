import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .min(8, "At least 8 characters, with uppercase, lowercase and a number.")
    .regex(
      /[a-z]/,
      "At least 8 characters, with uppercase, lowercase and a number.",
    )
    .regex(
      /[A-Z]/,
      "At least 8 characters, with uppercase, lowercase and a number.",
    )
    .regex(
      /[0-9]/,
      "At least 8 characters, with uppercase, lowercase and a number.",
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z.string().trim().min(1, "Password is required."),
});
