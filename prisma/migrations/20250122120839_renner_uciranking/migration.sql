/*
  Warnings:

  - Added the required column `uciranking` to the `renners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deelnemers" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "renners" ADD COLUMN     "uciranking" INTEGER NOT NULL;
