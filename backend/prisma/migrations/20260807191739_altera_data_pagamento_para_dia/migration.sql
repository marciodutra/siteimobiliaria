/*
  Warnings:

  - The `dataPagamento` column on the `Contrato` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Contrato" DROP COLUMN "dataPagamento",
ADD COLUMN     "dataPagamento" INTEGER;
