import { z } from "zod";

export const createBalanceSchema = z.object({
  body: z.object({
    currency: z
      .string({
        required_error: "Currency is required",
      })
      .default("USD"),
    amount: z.number({
      required_error: "Amount is required",
    }),
    isPremium: z.boolean().default(false),
  }),
});

export const updateBalanceSchema = z.object({
  body: z.object({
    currency: z
      .string({
        required_error: "Currency is required",
      })
      .default("USD"),
    amount: z.number({
      required_error: "Amount is required",
    }),
    isPremium: z.boolean().default(false),
  }),
});

export const balanceParamsSchema = z.object({
  id: z.string({
    required_error: "Balance ID is required",
    invalid_type_error: "ID must be a string",
  }),
});

export type createBalanceInput = z.TypeOf<typeof createBalanceSchema>["body"];
export type updateBalanceInput = z.TypeOf<typeof updateBalanceSchema>["body"];
export type modifyBalanceParams = z.TypeOf<typeof balanceParamsSchema>;
