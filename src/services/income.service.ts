import IncomeModel, { Income } from "../models/income.model";
import { modifyIncomeParams } from "../schema/income.schema";

export function createIncome(input: Partial<Income>) {
  return IncomeModel.create(input);
}

export function getIncomes({ userId }: { userId: string }) {
  return IncomeModel.find({ userId });
}

export function getIncome(
  { id }: modifyIncomeParams,
  { userId }: { userId: string }
) {
  return IncomeModel.findOne({ id, userId });
}

export function updateIncome(
  params: modifyIncomeParams,
  input: Partial<Income>,
  { userId }: { userId: string }
) {
  return IncomeModel.findByIdAndUpdate(params.id, input);
}

export function deleteIncome(
  params: modifyIncomeParams,
  { userId }: { userId: string }
) {
  return IncomeModel.findByIdAndRemove(params.id);
}
