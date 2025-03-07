import db from '@rplan/database';

import { signPasswordForgotten } from './jsonwebtoken.service.ts';

export const createPasswordForgotten = async (userId: db.User['id']) => {
  const token = signPasswordForgotten(userId);
  return db.prisma.passwordForgotten.create({
    data: {
      userId,
      token,
      createdAt: new Date().toISOString(),
    },
  });
};

export const getPasswordForgotten = (token: db.PasswordForgotten['token']) =>
  db.prisma.passwordForgotten.findUnique({
    where: {
      token,
    },
  });

export const updateIsUsedPasswordForgotten = (
  token: db.PasswordForgotten['token'],
  isUsed: db.PasswordForgotten['isUsed'],
) =>
  db.prisma.passwordForgotten.update({
    where: {
      token,
    },
    data: {
      isUsed,
    },
  });

export const deletePasswordForgotten = (token: db.PasswordForgotten['token']) =>
  db.prisma.passwordForgotten.delete({
    where: {
      token,
    },
  });
