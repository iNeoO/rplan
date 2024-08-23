import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
process.on('beforeExit', () => {
  prisma.$disconnect();
});

process.on('exit', () => {
  prisma.$disconnect();
});

export default prisma;
