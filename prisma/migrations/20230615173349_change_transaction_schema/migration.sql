/*
  Warnings:

  - You are about to drop the column `amount` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `lokasi` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipe_sampah` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TranscationType" AS ENUM ('REQUEST', 'DROPOFF');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('ORGANIC', 'RECYCLE', 'HAZARDOUS');

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "amount",
ADD COLUMN     "lokasi" TEXT NOT NULL,
ADD COLUMN     "type" "TranscationType" NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
DROP COLUMN "tipe_sampah",
ADD COLUMN     "tipe_sampah" "MaterialType" NOT NULL;
