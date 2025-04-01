import type { Plan, User } from '@rplan/database';
import jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface IDJwtPayload extends jwt.JwtPayload {
    id: string;
  }
}

type Verify = [null, jwt.IDJwtPayload] | [jwt.TokenExpiredError | jwt.JsonWebTokenError | jwt.NotBeforeError, null];

export const verify = (token: string, secret: string): Verify => {
  try {
    return [null, <jwt.IDJwtPayload>jwt.verify(token, secret)];
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return [error, null];
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return [error, null];
    }
    if (error instanceof jwt.NotBeforeError) {
      return [error, null];
    }
    throw error;
  }
};

export const signAuthCookie = (userId: User['id'], date: Date) =>
  jwt.sign({ id: userId }, process.env.AUTH_SECRET_KEY, {
    expiresIn: date.getTime() - new Date().getTime(),
  });

export const signRefreshCookie = (userId: User['id'], date: Date) =>
  jwt.sign({ id: userId }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: date.getTime() - new Date().getTime(),
  });

export const signPasswordForgotten = (userId: User['id']) =>
  jwt.sign({ id: userId }, process.env.PASSWORD_FORGOTTEN_SECRET_KEY, {
    expiresIn: Number.parseInt(process.env.TOKEN_PASSWORD_FORGOTTEN_EXPIRATION, 10),
  });

export const signEmailValidation = (userId: User['id']) =>
  jwt.sign({ id: userId }, process.env.EMAIL_VALIDATION_SECRET_KEY);

export const signInvitationValidation = (planId: Plan['id']) =>
  jwt.sign({ planId }, process.env.EMAIL_VALIDATION_SECRET_KEY);
