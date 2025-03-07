import { z } from '@hono/zod-openapi';
import zod from '@rplan/database/generated/zod/index.ts';
import type { PaginationQueryPayload } from './common.schema.ts';
import { UserSchema } from './user.schema.ts';

const InvitationSchema = z.object(zod.InvitationSchema.shape);

export const PostInvitationByEmailDtoSchema = InvitationSchema.pick({
  email: true,
  hasWritePermission: true,
  message: true,
}).merge(
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    message: z.string(),
  }),
);

export const PostInvitationByLinkToSchema = InvitationSchema.pick({
  hasWritePermission: true,
});

export const CreateInvitationByEmailPayloadSchema = InvitationSchema.pick({
  token: true,
  email: true,
  invitedById: true,
  hasWritePermission: true,
  message: true,
  planId: true,
}).merge(
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    message: z.string(),
  }),
);

export type CreateInvitationByEmailPayload = z.infer<typeof CreateInvitationByEmailPayloadSchema>;

export const InvitationByEmailSchema = z.object({
  message: z.string(),
  expiresAt: z.string().datetime(),
});

export const CreateInvitationByLinkPayloadSchema = InvitationSchema.pick({
  token: true,
  invitedById: true,
  hasWritePermission: true,
  planId: true,
});

export const InvitationByLinkSchema = InvitationSchema.pick({
  id: true,
  token: true,
  hasWritePermission: true,
  createdAt: true,
  expiresAt: true,
}).merge(
  z.object({
    createdAt: z.string().datetime(),
    expiresAt: z.string().datetime(),
  }),
);

export type CreateInvitationByLinkPayload = z.infer<typeof CreateInvitationByLinkPayloadSchema>;

export const DefaultInvitationReturnSchema = InvitationSchema.pick({
  id: true,
  token: true,
  email: true,
  status: true,
  hasWritePermission: true,
  createdAt: true,
  expiresAt: true,
  acceptedAt: true,
  invitationType: true,
})
  .merge(
    z.object({
      createdAt: z.string().datetime(),
      expiresAt: z.string().datetime(),
      acceptedAt: z.string().datetime().nullable(),
    }),
  )
  .merge(
    z.object({
      invitedBy: UserSchema.pick({ id: true, username: true }),
    }),
  );

export const InvitationsReturnSchema = z.object({
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  invitations: z.array(DefaultInvitationReturnSchema),
});

export const invitationsColumns = [
  'invitedBy.username',
  'invitedBy.id',
  'email',
  'status',
  'hasWritePermission',
  'createdAt',
  'expiresAt',
  'acceptedAt',
  'invitationType',
] as const;

export type InvitationsWithPaginationPayload = PaginationQueryPayload<(typeof invitationsColumns)[number]>;

// Tricks because InvitationTestSchema as request.params not working
// https://github.com/chrishoermann/zod-prisma-types/issues/276
// export const InvitationTokenSchema = InvitationSchema.pick({
//   token: true,
// });
export const InvitationTokenSchema = z.object({
  token: z.string(),
});

export const AcceptInvitationResponse = z.object({
  message: z.string(),
});
