/*
  Warnings:

  - You are about to drop the column `PushData` on the `deelnemers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deelnemers" DROP COLUMN "PushData";

-- CreateTable
CREATE TABLE "PushData" (
    "id" SERIAL NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256" TEXT NOT NULL,
    "auth" TEXT NOT NULL,

    CONSTRAINT "PushData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PushData" ADD CONSTRAINT "PushData_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
