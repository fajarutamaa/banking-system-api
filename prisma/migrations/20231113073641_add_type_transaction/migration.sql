/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `type_transaction` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "deletedAt",
ADD COLUMN     "type_transaction" TEXT NOT NULL;
