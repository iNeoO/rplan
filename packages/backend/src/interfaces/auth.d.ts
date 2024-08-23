import type { User } from '@prisma/client';

export type AuthVariables = { userId: User['id'] };
