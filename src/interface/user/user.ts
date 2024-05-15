import { z } from "zod";

export const userSchema = z.object({
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

export type UserDto = z.infer<typeof userSchema>;

export type SupplierDto = {
  category_id: string;
  country: string;
  state: string;
  city: string;
  year_established?: number | null;
  number_of_employees?: number | null;
};

export const personalInforSchema = z.object({
  firstname: z.string().min(1, {
    message: "This field is required",
  }),
  lastname: z.string().min(1, {
    message: "This field is required",
  }),
});

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, {
      message: "This field is required",
    }),
    new_password: z.string().min(1, {
      message: "This field is required",
    }),
    confirm_password: z.string().min(1, {
      message: "This field is required",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
