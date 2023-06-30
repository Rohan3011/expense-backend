import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Balance {
  @prop({ ref: () => User })
  user_id: Ref<User>;

  @prop({ default: "USD" })
  currency: string;

  @prop({ default: true })
  amount: number;

  @prop({ default: false })
  isPremium: boolean;
}

const BalanceModel = getModelForClass(Balance);
export default BalanceModel;
