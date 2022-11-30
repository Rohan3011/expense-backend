import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      firstName: z.string({
        required_error: "First Name is required",
      }),
      lastName: z.string({
        required_error: "Last Name is required",
      }),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password is too short - should be min 6 characters"),
      passwordConfirmation: z.string({
        required_error: "Password confirmation is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords do not match",
      path: ["passwordConfirmation"],
    }),
});

export type createUserInput = z.TypeOf<typeof createUserSchema>["body"];
