import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.upsert({
    where: { email: "molmelstet2016@gmail.com" },
    update: {},
    create: {
      name: "Carlos Eduardo Molmelstet",
      email: "molmelstet2016@gmail.com",
      password: "$2b$10$HOdEFd/9irAs.khdUsgljOt7e59vw/Bj.6N09sYBMbxAPX4XPxRZe",
      role: "ADMIN",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
