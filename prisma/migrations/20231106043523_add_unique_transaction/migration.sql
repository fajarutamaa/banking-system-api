/*
  Warnings:

  - A unique constraint covering the columns `[source_account_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destination_account_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_source_account_id_key" ON "Transaction"("source_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_destination_account_id_key" ON "Transaction"("destination_account_id");
