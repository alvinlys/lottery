-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draw_dates" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "draw_dates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "draw_dates_date_idx" ON "draw_dates"("date");
