/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `BankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_destination_account_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_source_account_id_fkey";

-- DropIndex
DROP INDEX "BankAccount_bank_account_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_user_id_key" ON "BankAccount"("user_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "BankAccount"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "BankAccount"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
