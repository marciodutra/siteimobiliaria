-- CreateEnum
CREATE TYPE "public"."StatusContrato" AS ENUM ('ATIVO', 'ENCERRADO', 'PENDENTE');

-- CreateTable
CREATE TABLE "public"."Contrato" (
    "id" SERIAL NOT NULL,
    "tipo" "public"."TipoNegocio" NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "status" "public"."StatusContrato" NOT NULL DEFAULT 'ATIVO',
    "clienteId" INTEGER NOT NULL,
    "imovelId" INTEGER NOT NULL,
    "corretorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Contrato" ADD CONSTRAINT "Contrato_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "public"."Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contrato" ADD CONSTRAINT "Contrato_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "public"."Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contrato" ADD CONSTRAINT "Contrato_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "public"."Corretor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
