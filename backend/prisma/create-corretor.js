const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function main(){

    const corretor = await prisma.corretor.create({
        data:{
            nome:"João Corretor",
            telefone:"11999999999",
            creci:"CRECI12345",
            userId:2
        }
    });


    console.log(corretor);

}


main()
.then(() => {
    prisma.$disconnect();
})
.catch((error)=>{
    console.error(error);
    prisma.$disconnect();
});