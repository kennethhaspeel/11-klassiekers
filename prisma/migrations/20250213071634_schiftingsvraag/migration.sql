-- AlterTable
ALTER TABLE "deelnemers" ADD COLUMN     "SchiftingMinuten" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "SchiftingSeconden" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "SchiftingUur" INTEGER NOT NULL DEFAULT 0;
