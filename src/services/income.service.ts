import IncomeModel, { Income } from "../models/income.model";
import { modifyIncomeParams } from "../schema/income.schema";

export function createIncome(input: Partial<Income>) {
  return IncomeModel.create(input);
}

export function getIncomes() {
  return IncomeModel.find();
}

export function getIncome(params: modifyIncomeParams) {
  return IncomeModel.findById(params.id);
}

export function updateIncome(
  params: modifyIncomeParams,
  input: Partial<Income>
) {
  return IncomeModel.findByIdAndUpdate(params.id, input);
}

export function deleteIncome(params: modifyIncomeParams) {
  return IncomeModel.findByIdAndRemove(params.id);
}
