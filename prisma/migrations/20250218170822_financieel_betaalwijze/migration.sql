/*
  Warnings:

  - Added the required column `betaalwijze` to the `finacieel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "finacieel" ADD COLUMN     "betaalwijze" VARCHAR(10) NOT NULL;
