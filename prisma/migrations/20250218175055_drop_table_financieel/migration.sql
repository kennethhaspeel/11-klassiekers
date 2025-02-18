/*
  Warnings:

  - You are about to drop the `finacieel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "finacieel" DROP CONSTRAINT "finacieel_deelnemerid_fkey";

-- DropTable
DROP TABLE "finacieel";
