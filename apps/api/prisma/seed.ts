import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Company = {
  id: number;
  code: string;
  name: string;
};
const companies: Company[] = [
  {
    id: 1,
    code: 'dmc',
    name: 'da ma cai',
  },
  {
    id: 2,
    code: 'magnum',
    name: 'magnum 4d',
  },
  {
    id: 3,
    code: 'toto',
    name: 'sports toto',
  },
];

async function main(): Promise<void> {
  for (let i = 0; i < companies.length; i++) {
    const { id, code, name } = <Company>companies[i];
    const response = await prisma.company.upsert({
      create: {
        id,
        code,
        name,
      },
      where: { id },
      update: {
        id,
        code,
        name,
      },
    });
    console.log(response);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
