import { Session } from 'prisma/zod/index.ts';
import prisma from '../libs/prisma.ts';
import type {
  SessionCreationDto,
} from '../schemas/session.schema.ts';

export const createSession = async (
  sessionDto: SessionCreationDto,
): Promise<Session> => prisma.session.create({
  data: {
    token: sessionDto.token,
    userId: sessionDto.userId,
  },
});

export const getSession = async (
  token: Session['token'],
): Promise<Session | null> => prisma.session.findUnique({
  where: {
    token,
  },
});

export const deleteSession = async (
  token: Session['token'],
): Promise<Session | null> => prisma.session.delete({
  where: {
    token,
  },
});
