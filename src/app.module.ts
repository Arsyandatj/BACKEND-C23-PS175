import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        PrismaModule,
        UserModule,
        TransactionModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
})
export class AppModule {}
