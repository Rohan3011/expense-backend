import UserModel, { User } from "../models/user.model";
import { UpdateUserInput } from "../schema/user.schema";

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function updateUserOnboarding(userId: string, input: UpdateUserInput) {
  return UserModel.findOneAndUpdate({ id: userId, ...input });
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
