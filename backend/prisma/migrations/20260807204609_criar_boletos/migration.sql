-- CreateEnum
CREATE TYPE "public"."StatusBoleto" AS ENUM ('PENDENTE', 'PAGO');

-- CreateTable
CREATE TABLE "public"."Boleto" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "status" "public"."StatusBoleto" NOT NULL DEFAULT 'PENDENTE',
    "dataPagamento" TIMESTAMP(3),
    "contratoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Boleto" ADD CONSTRAINT "Boleto_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "public"."Contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
