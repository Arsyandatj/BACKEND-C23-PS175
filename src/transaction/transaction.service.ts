import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { UpdateTransactionDto } from './dto/update-transaction-dto';
import { User } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {}

    async getAllTransaction() {
        try {
            const data = await this.prisma.transaction.findMany();
            return data;
        } catch (error) {
            return error;
        }
    }

    async getTransactionById(id: number) {
        try {
            const data = await this.prisma.transaction.findUnique({
                where: {
                    id: id,
                },
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async createTransaction(dto: CreateTransactionDto, usernya: User) {
        try {
            const result = await this.prisma.transaction.create({
                data: {
                    weight: dto.weight,
                    tipe_sampah: dto.tipe_sampah,
                    keterangan: dto.keterangan,
                    lokasi: dto.lokasi,
                    type: dto.type,
                    userId: usernya.id,
                },
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async updateTransaction(dto: UpdateTransactionDto, id: number) {
        try {
            const result = await this.prisma.transaction.update({
                where: {
                    id: id,
                },
                data: {
                    ...dto,
                },
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTransaction(id: number) {
        try {
            const result = await this.prisma.transaction.delete({
                where: {
                    id: id,
                },
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
