-- CreateTable
CREATE TABLE "logging" (
    "id" SERIAL NOT NULL,
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deelnemerid" TEXT NOT NULL,
    "onderwerp" VARCHAR(100) NOT NULL,
    "boodschap" VARCHAR(1000) NOT NULL,

    CONSTRAINT "logging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "logging" ADD CONSTRAINT "logging_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
