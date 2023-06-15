import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:binit123@34.128.82.102:5432/postgres?schema=public'
                }
            }
        })
    }
}
