/*
  Warnings:

  - You are about to drop the `Financieel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Financieel" DROP CONSTRAINT "Financieel_deelnemerid_fkey";

-- DropTable
DROP TABLE "Financieel";

-- CreateTable
CREATE TABLE "finacieel" (
    "id" SERIAL NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "datum" DATE NOT NULL,
    "bedrag" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "finacieel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "finacieel" ADD CONSTRAINT "finacieel_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
