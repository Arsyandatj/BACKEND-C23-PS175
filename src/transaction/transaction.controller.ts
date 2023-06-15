import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    HttpException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { User } from '@prisma/client';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}
    // Get all transaction
    @Get()
    async getAllTransaction() {
        const result = await this.transactionService.getAllTransaction();
        if (result.length === 0) {
            throw new HttpException('Data not found', 404);
        }
        return {
            message: 'Get all transaction success',
            data: result,
        };
    }

    // Get transaction by id
    @Get(':id')
    async getTransactionById(@Param('id') id: string) {
        const result = await this.transactionService.getTransactionById(
            parseInt(id, 10),
        );
        if (!result) {
            throw new HttpException('Data not found', 404);
        }
        return {
            message: 'Get transaction by id success',
            data: result,
        };
    }

    // Create new transaction
    @Post()
    async createTransaction(@Body() dto: any) {
        const user: User = {
            id: 1,
            email: 'test',
            password: 'test',
            nama: 'test',
            coins: 0,
            register_date: new Date(),
        };
        const result = await this.transactionService.createTransaction(
            dto,
            user,
        );
        if (!result) {
            throw new HttpException('Bad Request', 400);
        }
        return {
            message: 'Create new transaction success',
            data: result,
        };
    }

    // Update transaction by id
    @Put(':id')
    async updateTransaction(@Body() dto: any, @Param('id') id: string) {
        const result = await this.transactionService.updateTransaction(
            dto,
            parseInt(id, 10),
        );
        if (!result) {
            throw new HttpException('Bad Request', 400);
        }
        return {
            message: 'Update transaction success',
            data: result,
        };
    }

    // Delete transaction by id
    @Delete(':id')
    async deleteTransaction(@Param('id') id: string) {
        const result = await this.transactionService.deleteTransaction(
            parseInt(id, 10),
        );
        if (!result) {
            throw new HttpException('Not Found', 404);
        }
        return {
            message: 'Delete transaction success',
            data: result,
        };
    }
}
