-- CreateTable
CREATE TABLE "financieel" (
    "id" SERIAL NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bedrag" INTEGER NOT NULL DEFAULT 0,
    "betaalwijze" VARCHAR(50) NOT NULL,

    CONSTRAINT "financieel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "financieel" ADD CONSTRAINT "financieel_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
