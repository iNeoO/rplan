import db from '@rplan/database';
import type { PostUserDto, UserIdentifications, UserLoginDto } from '../schemas/user.schema.ts';

import { compareHash, hashPassword } from './crypt.service.ts';

export const createUser = async (userDto: PostUserDto): Promise<db.User> => {
  const hash = await hashPassword(userDto.password);

  return db.prisma.user.create({
    data: {
      email: userDto.email,
      username: userDto.username,
      password: hash,
      isEmailValid: false,
    },
  });
};

export const getUser = async ({ id, email, username }: UserIdentifications): Promise<db.User | null> => {
  if (!id && !email && !username) {
    throw new Error('[🗺️]: - Missing id or email or username when getting user');
  }
  const user = db.prisma.user.findUnique({
    where: { id, email, username },
  });
  return user;
};

export const getUserIfPasswordMatch = async ({ email, password }: UserLoginDto): Promise<db.User | null> => {
  const user = await db.prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const result = await compareHash(password, user.password);

  if (!result) {
    return null;
  }

  return user;
};

export const updateUserLastLogin = async (id: db.User['id']) =>
  db.prisma.user.update({
    where: { id },
    data: {
      lastLoginOn: new Date().toISOString(),
    },
  });

export const updateUserPassword = async (id: db.User['id'], password: db.User['password']) => {
  const hash = await hashPassword(password);

  return db.prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hash,
    },
  });
};

export const updateUserValidEmail = async (id: db.User['id'], isEmailValid: db.User['isEmailValid']) =>
  db.prisma.user.update({
    where: {
      id,
    },
    data: {
      isEmailValid,
    },
  });
