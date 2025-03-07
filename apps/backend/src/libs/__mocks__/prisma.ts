import type db from '@rplan/database';
import { beforeEach } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockDeep, mockReset } from 'vitest-mock-extended';

const prisma = mockDeep<db.PrismaClient>();

beforeEach(() => {
  mockReset(prisma);
});

export default prisma;
