import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type loginDto = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string(),
  company_name: z.string(),
  phone: z.string(),
  country: z.string(),
});

export type signupDto = z.infer<typeof signupSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
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
      email: z.string()
    })
  }),
  message: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginRes = RegisterRes
export type LoginResType = z.TypeOf<typeof LoginRes>
