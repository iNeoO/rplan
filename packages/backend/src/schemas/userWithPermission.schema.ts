import { Prisma } from '@prisma/client';
import { UserWithPermissionsSchema, UserSchema } from 'prisma/zod/index.ts';
import { z } from '@hono/zod-openapi';
import { PaginationQueryPayload } from './common.schema.ts';
import { GetUserSchema } from './user.schema.ts';

export const GetUserWithPermission = UserWithPermissionsSchema.pick({
  hasWritePermission: true,
  isCreator: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  GetUserSchema.pick({
    username: true,
  }),
);

export const GetUserWithPermissionReturn = GetUserWithPermission.merge(
  z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

export const userSelect = {
  hasWritePermission: true,
  isCreator: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      username: true,
    },
  },
} satisfies Prisma.UserWithPermissionsSelect;

export const permissionsColumns = [
  'user.id',
  'user.username',
  'hasWritePermission',
  'isCreator',
  'createdAt',
  'updatedAt',
] as const;

export type PermissionsWithPaginationPayload = PaginationQueryPayload<
  (typeof permissionsColumns)[number]
>;

export const DefaultPermissionReturnSchema = UserWithPermissionsSchema.pick({
  hasWritePermission: true,
  isCreator: true,
  createdAt: true,
  updatedAt: true,
})
  .merge(
    z.object({
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
  )
  .merge(
    z.object({
      user: UserSchema.pick({ id: true, username: true }),
    }),
  );

export const PermissionsReturnSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  permissions: z.array(DefaultPermissionReturnSchema),
});
