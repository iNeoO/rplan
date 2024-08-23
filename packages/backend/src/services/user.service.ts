import { User } from 'prisma/zod/index.ts';
import prisma from '../libs/prisma.ts';
import {
  PostUserDto,
  UserIdentifications,
  UserLoginDto,
} from '../schemas/user.schema.ts';

import { hashPassword, compareHash } from './crypt.service.ts';

export const createUser = async (userDto: PostUserDto): Promise<User> => {
  const hash = await hashPassword(userDto.password);

  return prisma.user.create({
    data: {
      email: userDto.email,
      username: userDto.username,
      password: hash,
      createdAt: new Date().toISOString(),
      isEmailValid: false,
    },
  });
};

export const getUser = async (
  {
    id,
    email,
    username,
  }: UserIdentifications,
): Promise<User | null> => {
  if (!id && !email && !username) {
    throw new Error('[🗺️]: - Missing id or email or username when getting user');
  }
  const user = prisma.user.findUnique({
    where: { id, email, username },
  });
  return user;
};

export const getUserIfPasswordMatch = async (
  {
    email,
    password,
  }: UserLoginDto,
): Promise<User | null> => {
  const user = await prisma.user.findUnique({
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

export const updateUserLastLogin = async (id: User['id']) => prisma.user.update({
  where: { id },
  data: {
    lastLoginOn: new Date().toISOString(),
  },
});

export const updateUserPassword = async (id: User['id'], password: User['password']) => {
  const hash = await hashPassword(password);

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hash,
    },
  });
};

export const updateUserValidEmail = async (
  id: User['id'],
  isEmailValid: User['isEmailValid'],
) => prisma.user.update({
  where: {
    id,
  },
  data: {
    isEmailValid,
  },
});
