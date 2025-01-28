/*
  Warnings:

  - You are about to drop the column `deelnemerid` on the `uitslagen` table. All the data in the column will be lost.
  - You are about to drop the column `punten` on the `uitslagen` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "uitslagen" DROP CONSTRAINT "uitslagen_deelnemerid_fkey";

-- AlterTable
ALTER TABLE "uitslagen" DROP COLUMN "deelnemerid",
DROP COLUMN "punten";
