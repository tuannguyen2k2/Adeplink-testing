import { z } from "zod";

export const userSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  picture: z.string().url(),
  provider: z.enum(["email", "google", "facebook", "linkedin"]),
  role: z.enum([
    "superadmin",
    "admin",
    "consultant",
    "manager",
    "enduser",
    "client",
  ]),
});

export type UserDto = z.infer<typeof userSchema>;

export const personalInforSchema = z.object({
  firstname: z.string().min(1, {
    message: 'This field is required'
  }),
  lastname: z.string().min(1, {
    message: 'This field is required'
  }),
});

export const changePasswordSchema = z.object({
  old_password: z.string().min(1, {
    message: 'This field is required'
  }),
  new_password: z.string().min(1, {
    message: 'This field is required'
  }),
  confirm_password: z.string().min(1, {
    message: 'This field is required'
  })
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

