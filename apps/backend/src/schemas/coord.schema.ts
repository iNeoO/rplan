import { z } from '@hono/zod-openapi';
import type { Prisma } from '@rplan/database';
import zod from '@rplan/database/zod';

export const CoordSchema = z.object(zod.CoordSchema.shape);

export const PostCoordDtoSchema = CoordSchema.pick({
  latitude: true,
  longitude: true,
  street: true,
  city: true,
  country: true,
  postalCode: true,
});

export const GetCoordSchema = CoordSchema.pick({
  id: true,
  latitude: true,
  longitude: true,
  street: true,
  city: true,
  country: true,
  postalCode: true,
  createdAt: true,
  updatedAt: true,
});

export const GetCoordReturnSchema = GetCoordSchema.merge(
  z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

export const coordSelect = {
  id: true,
  longitude: true,
  latitude: true,
  street: true,
  city: true,
  country: true,
  postalCode: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CoordSelect;
