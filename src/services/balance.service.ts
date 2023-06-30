import BalanceModel, { Balance } from "../models/balance.model";
import { modifyBalanceParams } from "../schema/balance.schema";

export function createBalance(input: Partial<Balance>) {
  return BalanceModel.create(input);
}

export function getBalance({ userId }: { userId: string }) {
  return BalanceModel.find({ user_id: userId });
}

export function updateBalance(
  params: modifyBalanceParams,
  input: Partial<Balance>
) {
  return BalanceModel.findByIdAndUpdate(params.id, input);
}

export function deleteBalance(params: modifyBalanceParams) {
  return BalanceModel.findByIdAndRemove(params.id);
}
