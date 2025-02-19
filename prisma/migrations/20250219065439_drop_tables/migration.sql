/*
  Warnings:

  - You are about to drop the `PushData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `financieel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logging` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PushData" DROP CONSTRAINT "PushData_deelnemerid_fkey";

-- DropForeignKey
ALTER TABLE "financieel" DROP CONSTRAINT "financieel_deelnemerid_fkey";

-- DropForeignKey
ALTER TABLE "logging" DROP CONSTRAINT "logging_deelnemerid_fkey";

-- DropTable
DROP TABLE "PushData";

-- DropTable
DROP TABLE "financieel";

-- DropTable
DROP TABLE "logging";
