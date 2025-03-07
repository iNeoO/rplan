import db from '@rplan/database';
import type { SessionCreationDto } from '../schemas/session.schema.ts';

export const createSession = (sessionDto: SessionCreationDto): Promise<db.Session> =>
  db.prisma.session.create({
    data: {
      token: sessionDto.token,
      userId: sessionDto.userId,
    },
  });

export const getSession = (token: db.Session['token']): Promise<db.Session | null> =>
  db.prisma.session.findUnique({
    where: {
      token,
    },
  });

export const deleteSession = (token: db.Session['token']): Promise<db.Session | null> =>
  db.prisma.session.delete({
    where: {
      token,
    },
  });
