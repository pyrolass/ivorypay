import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Merchant {
  @Prop({ unique: true, required: true })
  merchant_name: string;

  @Prop({ required: true, unique: true })
  merchant_email: string;

  @Prop({ required: true })
  merchant_password: string;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
