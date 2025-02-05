/*
  Warnings:

  - Added the required column `rennerid` to the `tussenstanden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deelnemers" ALTER COLUMN "bevestigd" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tussenstanden" ADD COLUMN     "rennerid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tussenstanden" ADD CONSTRAINT "tussenstanden_rennerid_fkey" FOREIGN KEY ("rennerid") REFERENCES "renners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
