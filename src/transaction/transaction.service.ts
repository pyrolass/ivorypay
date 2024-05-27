import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/schema/Transaction.schema';
import { CreateTransactionDto } from './dto/CreateTransactionDto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      await this.transactionModel.create(createTransactionDto);
    } catch (e) {
      throw e;
    }
  }

  async completeTransaction(stripe_id: string) {
    try {
      await this.transactionModel.findOneAndUpdate(
        {
          stripe_id: stripe_id,
        },
        {
          status: 'completed',
        },
      );
    } catch (e) {
      throw e;
    }
  }
  async failTransaction(stripe_id: string) {
    try {
      await this.transactionModel.findOneAndUpdate(
        {
          stripe_id: stripe_id,
        },
        {
          status: 'failed',
        },
      );
    } catch (e) {
      throw e;
    }
  }

  async expireTransaction(stripe_id: string) {
    try {
      await this.transactionModel.findOneAndUpdate(
        {
          stripe_id: stripe_id,
        },
        {
          status: 'expired',
        },
      );
    } catch (e) {
      throw e;
    }
  }
}
