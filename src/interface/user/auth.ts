import { z } from "zod";
import { UserDto } from "./user";

export const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type loginDto = z.infer<typeof loginSchema>;

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: UserDto;
}

export interface VerifyOtpResponse {
  code: string;
  message: string;
  data: LoginResponse;
}

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  company_name: z.string(),
  phone: z.string(),
  country: z.string().optional(),
  industry: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  is_supplier: z.boolean().optional(),
});

export type SignUpDto = z.infer<typeof signupSchema>;

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    otp: z.string(),
    new_password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type resetPasswordDto = z.infer<typeof resetPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type forgotPasswordDto = z.infer<typeof forgotPasswordSchema>;

export const sentOtpSchema = z.object({
  email: z.string().email(),
});

export type sentOtpDto = z.infer<typeof sentOtpSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string(),
});

export type verifyOtpDto = z.infer<typeof verifyOtpSchema>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginRes = RegisterRes;
export type LoginResType = z.TypeOf<typeof LoginRes>;
