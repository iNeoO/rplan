import {
  CreateInvitationPayload,
} from '../schemas/permissionInvitation.schema.ts';
import prisma from '../libs/prisma.ts';

export const createInvitation = async (
  invitationPayload: CreateInvitationPayload,
) => prisma.permissionInvitation.create({
  data: {
    ...invitationPayload,
  },
});
