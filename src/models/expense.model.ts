import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";

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
  @prop({ required: true })
  amount: number;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  source: ExpenseSource[];

  @prop({ required: true })
  tags: ExpenseTags[];

  @prop()
  note?: string;
}

const ExpenseModel = getModelForClass(Expense);

export default ExpenseModel;
