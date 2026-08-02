-- CreateEnum
CREATE TYPE "public"."TipoUsuario" AS ENUM ('ADMIN', 'CORRETOR');

-- CreateEnum
CREATE TYPE "public"."TipoNegocio" AS ENUM ('VENDA', 'ALUGUEL');

-- CreateEnum
CREATE TYPE "public"."StatusImovel" AS ENUM ('DISPONIVEL', 'VENDIDO', 'ALUGADO', 'INATIVO');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "public"."TipoUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Corretor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "creci" TEXT NOT NULL,
    "foto" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Corretor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Imovel" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "negocio" "public"."TipoNegocio" NOT NULL,
    "valor" DECIMAL(12,2) NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "quartos" INTEGER NOT NULL,
    "banheiros" INTEGER NOT NULL,
    "suites" INTEGER NOT NULL,
    "vagas" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "status" "public"."StatusImovel" NOT NULL DEFAULT 'DISPONIVEL',
    "corretorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Imagem" (
    "id" SERIAL NOT NULL,
    "caminho" TEXT NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "imovelId" INTEGER NOT NULL,

    CONSTRAINT "Imagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Mensagem" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "mensagem" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imovelId" INTEGER NOT NULL,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_creci_key" ON "public"."Corretor"("creci");

-- CreateIndex
CREATE UNIQUE INDEX "Corretor_userId_key" ON "public"."Corretor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Imovel_codigo_key" ON "public"."Imovel"("codigo");

-- AddForeignKey
ALTER TABLE "public"."Corretor" ADD CONSTRAINT "Corretor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Imovel" ADD CONSTRAINT "Imovel_corretorId_fkey" FOREIGN KEY ("corretorId") REFERENCES "public"."Corretor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Imagem" ADD CONSTRAINT "Imagem_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "public"."Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mensagem" ADD CONSTRAINT "Mensagem_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "public"."Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
