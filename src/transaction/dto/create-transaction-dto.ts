import { MaterialType, TranscationType } from '@prisma/client';
import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CreateTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    weight: number;

    @IsNotEmpty()
    @IsEnum(['ORGANIC', 'RECYCLE', 'HAZARDOUS'])
    tipe_sampah: MaterialType;

    @IsString()
    keterangan: string;

    @IsString()
    @IsNotEmpty()
    lokasi: string;

    @IsNotEmpty()
    @IsEnum(['REQUEST', 'DROPOFF'])
    type: TranscationType;
}
