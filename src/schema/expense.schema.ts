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
    required_error: "Date of Expense is required",
    invalid_type_error: "Name must be a date",
  })
);

export const expenseBodySchema = z.object({
  amount: z.number(),
  date: dateSchema,
  source: z.string(),
  tags: z.array(z.string()),
  note: z.string().optional(),
});

export const expenseBodyOptionalSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .optional(),
  date: dateSchema.optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  note: z.string().optional(),
});

export const expenseParamsSchema = z.object({
  id: z.string({
    required_error: "Expense ID is required",
    invalid_type_error: "ID must be a string",
  }),
});

export const createExpenseSchema = z.object({
  body: expenseBodySchema,
});

export const updateExpenseSchema = z.object({
  params: expenseParamsSchema,
  body: expenseBodyOptionalSchema,
});

export const deleteExpenseSchema = z.object({
  params: expenseParamsSchema,
});

export const getExpenseSchema = z.object({
  params: expenseParamsSchema,
});

export type createExpenseInput = z.TypeOf<typeof expenseBodySchema>;
export type modifyExpenseParams = z.TypeOf<typeof expenseParamsSchema>;
export type updateExpenseInput = z.TypeOf<typeof expenseBodyOptionalSchema>;
