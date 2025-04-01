import { type Session, prisma } from '@rplan/database';
import type { SessionCreationDto } from '../schemas/session.schema.ts';

export const createSession = (sessionDto: SessionCreationDto): Promise<Session> =>
  prisma.session.create({
    data: {
      token: sessionDto.token,
      userId: sessionDto.userId,
    },
  });

export const getSession = (token: Session['token']): Promise<Session | null> =>
  prisma.session.findUnique({
    where: {
      token,
    },
  });

export const deleteSession = (token: Session['token']): Promise<Session | null> =>
  prisma.session.delete({
    where: {
      token,
    },
  });
