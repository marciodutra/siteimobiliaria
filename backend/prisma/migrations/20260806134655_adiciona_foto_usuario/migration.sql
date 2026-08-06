/*
  Warnings:

  - You are about to drop the column `foto` on the `Corretor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Corretor" DROP COLUMN "foto";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "foto" TEXT;
