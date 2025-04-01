import { type PasswordForgotten, type User, prisma } from '@rplan/database';

import { signPasswordForgotten } from './jsonwebtoken.service.ts';

export const createPasswordForgotten = async (userId: User['id']) => {
  const token = signPasswordForgotten(userId);
  return prisma.passwordForgotten.create({
    data: {
      userId,
      token,
      createdAt: new Date().toISOString(),
    },
  });
};

export const getPasswordForgotten = (token: PasswordForgotten['token']) =>
  prisma.passwordForgotten.findUnique({
    where: {
      token,
    },
  });

export const updateIsUsedPasswordForgotten = (token: PasswordForgotten['token'], isUsed: PasswordForgotten['isUsed']) =>
  prisma.passwordForgotten.update({
    where: {
      token,
    },
    data: {
      isUsed,
    },
  });

export const deletePasswordForgotten = (token: PasswordForgotten['token']) =>
  prisma.passwordForgotten.delete({
    where: {
      token,
    },
  });
