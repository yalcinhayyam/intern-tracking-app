// npx prisma db seed
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const roles = [
    { id: 1, code: "ADMIN" },
    { id: 2, code: "USER" },
  ];
  const internTypes = [
    { id: 1, code: "MANDATORY" },
    { id: 2, code: "VOLUNTARY" },
    { id: 3, code: "LONG_PERIOD" },
  ];
  roles.forEach(async (role, index) => {
    await prisma.role.upsert({
      where: { title: role.code, id: role.id },
      update: {
        title: role.code,
        code: role.code,
      },
      create: {
        id: role.id,
        title: role.code,
        code: role.code,
      },
    });
  });

  internTypes.forEach(async (type, index) => {
    await prisma.internType.upsert({
      where: { title: type.code, id: type.id },
      update: {
        title: type.code,
        code: type.code,
      },
      create: {
        id: type.id,
        title: type.code,
        code: type.code,
      },
    });
  });
  //   console.log({});
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
