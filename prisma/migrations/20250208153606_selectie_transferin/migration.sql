-- AlterTable
ALTER TABLE "selecties" ADD COLUMN     "transfer_in" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "tussenstanden" ALTER COLUMN "punten" SET DEFAULT 0;
