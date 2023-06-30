import ExpenseModel, { Expense } from "../models/expense.model";
import { modifyExpenseParams } from "../schema/expense.schema";

export function createExpense(input: Partial<Expense>) {
  return ExpenseModel.create(input);
}

export function getExpenses({ userId }: { userId: string }) {
  return ExpenseModel.find({ userId });
}

export function getExpense(
  params: modifyExpenseParams,
  { userId }: { userId: string }
) {
  return ExpenseModel.findOne({ _id: params.id, userId });
}

export function updateExpense(
  params: modifyExpenseParams,
  input: Partial<Expense>,
  { userId }: { userId: string }
) {
  return ExpenseModel.findByIdAndUpdate(params.id, input);
}

export function deleteExpense(
  params: modifyExpenseParams,
  { userId }: { userId: string }
) {
  return ExpenseModel.findByIdAndRemove(params.id);
}
