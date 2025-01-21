-- CreateTable
CREATE TABLE "deelnemers" (
    "id" TEXT NOT NULL,
    "naam" VARCHAR(100) NOT NULL,
    "voornaam" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,
    "telefoon" VARCHAR(100) NOT NULL,
    "ploegnaam" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deelnemers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selecties" (
    "id" SERIAL NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "rennerid" INTEGER NOT NULL,
    "datum_in" DATE NOT NULL,
    "datum_uit" DATE NOT NULL,

    CONSTRAINT "selecties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renners" (
    "id" SERIAL NOT NULL,
    "naam" VARCHAR(100) NOT NULL,
    "foto" TEXT NOT NULL,
    "vlag" VARCHAR(5) NOT NULL,
    "nationaliteit" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "teamid" INTEGER NOT NULL,

    CONSTRAINT "renners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "naam" VARCHAR(100) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedstrijden" (
    "id" SERIAL NOT NULL,
    "naam" VARCHAR(100) NOT NULL,
    "datum" DATE NOT NULL,
    "afgesloten" BOOLEAN NOT NULL,

    CONSTRAINT "wedstrijden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uitslagen" (
    "id" SERIAL NOT NULL,
    "rennerid" INTEGER NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "wedstrijdid" INTEGER NOT NULL,
    "positie" INTEGER NOT NULL,
    "punten" INTEGER NOT NULL,

    CONSTRAINT "uitslagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tussenstanden" (
    "id" SERIAL NOT NULL,
    "deelnemerid" TEXT NOT NULL,
    "wedstrijdid" INTEGER NOT NULL,
    "punten" INTEGER NOT NULL,

    CONSTRAINT "tussenstanden_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deelnemers_email_key" ON "deelnemers"("email");

-- AddForeignKey
ALTER TABLE "selecties" ADD CONSTRAINT "selecties_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selecties" ADD CONSTRAINT "selecties_rennerid_fkey" FOREIGN KEY ("rennerid") REFERENCES "renners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renners" ADD CONSTRAINT "renners_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uitslagen" ADD CONSTRAINT "uitslagen_rennerid_fkey" FOREIGN KEY ("rennerid") REFERENCES "renners"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uitslagen" ADD CONSTRAINT "uitslagen_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uitslagen" ADD CONSTRAINT "uitslagen_wedstrijdid_fkey" FOREIGN KEY ("wedstrijdid") REFERENCES "wedstrijden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tussenstanden" ADD CONSTRAINT "tussenstanden_deelnemerid_fkey" FOREIGN KEY ("deelnemerid") REFERENCES "deelnemers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tussenstanden" ADD CONSTRAINT "tussenstanden_wedstrijdid_fkey" FOREIGN KEY ("wedstrijdid") REFERENCES "wedstrijden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
