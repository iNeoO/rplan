import { type Invitation, prisma } from '@rplan/database';
import type { CreateInvitationByEmailPayload, CreateInvitationByLinkPayload } from '../schemas/invitation.schema.ts';
import type { InvitationsWithPaginationPayload } from '../schemas/invitation.schema.ts';

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const createInvitationByEmail = async (invitationPayload: CreateInvitationByEmailPayload) =>
  prisma.invitation.create({
    data: {
      ...invitationPayload,
      invitationType: 'EMAIL',
      expiresAt: addDays(new Date(), 7),
    },
  });

export const createInvitationByLink = async (invitationPayload: CreateInvitationByLinkPayload) =>
  prisma.invitation.create({
    data: {
      ...invitationPayload,
      invitationType: 'LINK',
      expiresAt: addDays(new Date(), 7),
    },
  });

export const getInvitation = async (token: Invitation['token']) =>
  prisma.invitation.findUnique({
    where: {
      token,
    },
  });

export const acceptInvitation = async (token: Invitation['token']) =>
  prisma.invitation.update({
    where: {
      token,
    },
    data: {
      acceptedAt: new Date(),
      status: 'ACCEPTED',
    },
  });

export const invitations = async (planId: Invitation['planId'], params: InvitationsWithPaginationPayload) => {
  const total = await prisma.invitation.count({
    where: {
      planId,
    },
  });

  const { sort, order, offset, limit } = params;

  const results = await prisma.invitation.findMany({
    where: {
      planId,
    },
    select: {
      id: true,
      email: true,
      status: true,
      hasWritePermission: true,
      createdAt: true,
      expiresAt: true,
      acceptedAt: true,
      invitationType: true,
      invitedBy: {
        select: {
          id: true,
          username: true,
        },
      },
      token: true,
    },
    orderBy: { [sort]: order },
    skip: offset,
    take: limit,
  });

  const filteredResults = results.map((invitation) => {
    if (invitation.invitationType !== 'EMAIL') {
      // Supprimer le token si l'invitationType n'est pas "TOKEN"
      return {
        ...invitation,
        token: '',
      };
    }
    return invitation;
  });

  return {
    total,
    limit,
    offset,
    invitations: filteredResults,
  };
};
