-- CreateTable
CREATE TABLE "Financieel" (
    "id" SERIAL NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "datum" DATE NOT NULL,
    "bedrag" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Financieel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Financieel" ADD CONSTRAINT "Financieel_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
