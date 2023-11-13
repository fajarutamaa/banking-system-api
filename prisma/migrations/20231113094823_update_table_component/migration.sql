/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bank_account_number]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "updatedAt";

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_bank_account_number_key" ON "BankAccount"("bank_account_number");
