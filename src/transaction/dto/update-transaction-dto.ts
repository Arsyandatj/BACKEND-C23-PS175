import { MaterialType, TranscationType } from '@prisma/client';
import { IsString, IsNumber, IsEnum } from 'class-validator';

export class UpdateTransactionDto {
    @IsNumber()
    weight: number;

    @IsEnum(['ORGANIC', 'RECYCLE', 'HAZARDOUS'])
    tipe_sampah: MaterialType;

    @IsString()
    keterangan: string;

    @IsString()
    lokasi: string;

    @IsEnum(['REQUEST', 'DROPOFF'])
    type: TranscationType;
}
