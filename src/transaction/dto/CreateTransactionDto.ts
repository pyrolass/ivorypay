import { Types } from 'mongoose';

export class CreateTransactionDto {
  stripe_id: string;
  merchant_id: Types.ObjectId;
  amount: number;
  currency: string;
}
