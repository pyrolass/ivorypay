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
}
