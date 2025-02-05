/*
  Warnings:

  - You are about to drop the column `positie` on the `uitslagen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tussenstanden" ALTER COLUMN "punten" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "uitslagen" DROP COLUMN "positie",
ADD COLUMN     "punten" INTEGER NOT NULL DEFAULT 100;
