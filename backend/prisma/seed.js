const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();


async function main(){

    const senha = await bcrypt.hash("123456",10);


    const user = await prisma.user.create({
        data:{
            nome:"João Corretor",
            email:"joao@imobiliaria.com",
            senha,
            tipo:"CORRETOR"
        }
    });


    const corretor = await prisma.corretor.create({
        data:{
            nome:"João Corretor",
            telefone:"11999999999",
            creci:"12345",
            userId:user.id
        }
    });


    console.log({
        user,
        corretor
    });

}


main()
.finally(()=>{
    prisma.$disconnect();
});