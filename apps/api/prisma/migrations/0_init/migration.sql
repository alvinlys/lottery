-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "draw_number" TEXT NOT NULL,
    "result" JSONB NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_code_key" ON "companies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE INDEX "results_companyId_date_idx" ON "results"("companyId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "results_companyId_date_key" ON "results"("companyId", "date");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

