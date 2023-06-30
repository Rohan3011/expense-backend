import { z } from "zod";

export const createSourceSchema = z.object({
  name: z.string({ required_error: "Source name is required" }),
  link: z.string().optional(),
  color: z.string().optional(),
});

export const createTagSchema = z.object({
  name: z.string({ required_error: "Tag name is required" }),
  link: z.string().optional(),
  color: z.string().optional(),
});

const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  },
  z.date({
    required_error: "Date of Income is required",
    invalid_type_error: "Name must be a date",
  })
);

export const incomeBodySchema = z.object({
  amount: z.number(),
  date: dateSchema,
  source: z.string(),
  tags: z.array(z.string()),
  note: z.string().optional(),
});

export const incomeBodyOptionalSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .optional(),
  date: dateSchema.optional(),
  source: z.string().optional(),
  tags: z.array(z.string()),
  note: z.string().optional(),
});

export const incomeParamsSchema = z.object({
  id: z.string({
    required_error: "Income ID is required",
    invalid_type_error: "ID must be a string",
  }),
});

export const createIncomeSchema = z.object({
  body: incomeBodySchema,
});

export const updateIncomeSchema = z.object({
  params: incomeParamsSchema,
  body: incomeBodyOptionalSchema,
});

export const deleteIncomeSchema = z.object({
  params: incomeParamsSchema,
});

export const getIncomeSchema = z.object({
  params: incomeParamsSchema,
});

export type createIncomeInput = z.TypeOf<typeof incomeBodySchema>;
export type modifyIncomeParams = z.TypeOf<typeof incomeParamsSchema>;
export type updateIncomeInput = z.TypeOf<typeof incomeBodyOptionalSchema>;
