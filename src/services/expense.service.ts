import ExpenseModel, { Expense } from "../models/expense.model";
import { modifyExpenseParams } from "../schema/expense.schema";

export function createExpense(input: Partial<Expense>) {
  return ExpenseModel.create(input);
}

export function getExpenses() {
  return ExpenseModel.find();
}

export function getExpense(params: modifyExpenseParams) {
  return ExpenseModel.findById(params.id);
}

export function updateExpense(
  params: modifyExpenseParams,
  input: Partial<Expense>
) {
  return ExpenseModel.findByIdAndUpdate(params.id, input);
}

export function deleteExpense(params: modifyExpenseParams) {
  return ExpenseModel.findByIdAndRemove(params.id);
}
