import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    HttpException,
    UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { UpdateTransactionDto } from './dto/update-transaction-dto';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService) {}
    // Get all transaction
    @UseGuards(JwtGuard)
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
    @UseGuards(JwtGuard)
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
    @UseGuards(JwtGuard)
    @Post()
    async createTransaction(
        @Body() dto: CreateTransactionDto,
        @GetUser() user: User,
    ) {
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
    @UseGuards(JwtGuard)
    @Put(':id')
    async updateTransaction(
        @Body() dto: UpdateTransactionDto,
        @Param('id') id: string,
    ) {
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
    @UseGuards(JwtGuard)
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
