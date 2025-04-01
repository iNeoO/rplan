import type { PrismaClient } from '@rplan/database';
import { beforeEach } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockDeep, mockReset } from 'vitest-mock-extended';

const prisma = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prisma);
});

export default prisma;
