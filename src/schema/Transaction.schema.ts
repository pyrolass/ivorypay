import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Transaction {
  @Prop({ required: true })
  stripe_id: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({
    required: true,
    enum: ['pending', 'failed', 'completed', 'expired'],
    default: 'pending',
  })
  status: string;

  @Prop({
    required: true,
  })
  merchant_id: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
