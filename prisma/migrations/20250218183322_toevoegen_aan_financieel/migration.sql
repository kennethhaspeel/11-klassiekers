/*
  Warnings:

  - Added the required column `betaalwijze` to the `financieel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financieel" ADD COLUMN     "betaalwijze" VARCHAR(50) NOT NULL;
