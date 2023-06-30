import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
  Severity,
} from "@typegoose/typegoose";
import { User } from "./user.model";

export class IncomeSource {
  @prop({ required: true })
  name: string;

  @prop()
  link?: string;

  @prop()
  color?: string;
}

export class IncomeTags {
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
export class Income {
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

const IncomeModel = getModelForClass(Income);

export default IncomeModel;
