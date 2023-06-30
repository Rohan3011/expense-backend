import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { User } from "./user.model";

export class ExpenseSource {
  @prop({ required: true })
  name: string;

  @prop()
  link?: string;

  @prop()
  color?: string;
}

export class ExpenseTags {
  @prop({ required: true })
  name: string;

  @prop()
  link?: string;

  @prop()
  color?: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Expense {
  @prop({ ref: () => User })
  userId: Ref<User>;

  @prop({ required: true })
  amount: number;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  source: string;

  @prop({ required: true })
  tags: string[];

  @prop()
  note?: string;
}

const ExpenseModel = getModelForClass(Expense);

export default ExpenseModel;
