import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

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
})
export class Income {
  @prop({ required: true })
  amount: number;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  source: IncomeSource[];

  @prop({ required: true })
  tags: IncomeTags[];

  @prop()
  note?: string;
}

const IncomeModel = getModelForClass(Income);

export default IncomeModel;
