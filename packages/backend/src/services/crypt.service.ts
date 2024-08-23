import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string) => {
  const saltOrRounds = process.env.SALT_ROUNDS || 8;
  return bcrypt.hash(password, +saltOrRounds);
};

export const compareHash = (
  password: string,
  hash: string,
) => bcrypt.compare(password, hash);
