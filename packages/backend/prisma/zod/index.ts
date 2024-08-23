import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const CoordScalarFieldEnumSchema = z.enum(['id','longitude','latitude','street','city','country','postalCode','createdAt','updatedAt','stepId']);

export const StepScalarFieldEnumSchema = z.enum(['id','name','description','startDate','endDate','createdAt','updatedAt','planId']);

export const PlanScalarFieldEnumSchema = z.enum(['id','name','description','departureDate','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','username','password','isEmailValid','createdAt','lastLoginOn']);

export const PasswordForgottenScalarFieldEnumSchema = z.enum(['token','createdAt','isUsed','userId']);

export const PermissionInvitationScalarFieldEnumSchema = z.enum(['token','email','invitedBy','createdAt','hasWritePermission','isUsed','planId']);

export const UserWithPermissionsScalarFieldEnumSchema = z.enum(['planId','userId','hasWritePermission','isCreator','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// COORD SCHEMA
/////////////////////////////////////////

export const CoordSchema = z.object({
  id: z.string().cuid(),
  longitude: z.string(),
  latitude: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  stepId: z.string(),
})

export type Coord = z.infer<typeof CoordSchema>

/////////////////////////////////////////
// STEP SCHEMA
/////////////////////////////////////////

export const StepSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  planId: z.string(),
})

export type Step = z.infer<typeof StepSchema>

/////////////////////////////////////////
// PLAN SCHEMA
/////////////////////////////////////////

export const PlanSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Plan = z.infer<typeof PlanSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  /**
   * ,
   */
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date(),
  lastLoginOn: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PASSWORD FORGOTTEN SCHEMA
/////////////////////////////////////////

export const PasswordForgottenSchema = z.object({
  token: z.string(),
  createdAt: z.coerce.date(),
  isUsed: z.boolean(),
  userId: z.string(),
})

export type PasswordForgotten = z.infer<typeof PasswordForgottenSchema>

/////////////////////////////////////////
// PERMISSION INVITATION SCHEMA
/////////////////////////////////////////

export const PermissionInvitationSchema = z.object({
  token: z.string(),
  /**
   * ,
   */
  email: z.string().email({ message: 'Invalid email address' }),
  /**
   * ,
   */
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean(),
  planId: z.string(),
})

export type PermissionInvitation = z.infer<typeof PermissionInvitationSchema>

/////////////////////////////////////////
// USER WITH PERMISSIONS SCHEMA
/////////////////////////////////////////

export const UserWithPermissionsSchema = z.object({
  planId: z.string(),
  userId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserWithPermissions = z.infer<typeof UserWithPermissionsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// COORD
//------------------------------------------------------

export const CoordIncludeSchema: z.ZodType<Prisma.CoordInclude> = z.object({
  step: z.union([z.boolean(),z.lazy(() => StepArgsSchema)]).optional(),
}).strict()

export const CoordArgsSchema: z.ZodType<Prisma.CoordDefaultArgs> = z.object({
  select: z.lazy(() => CoordSelectSchema).optional(),
  include: z.lazy(() => CoordIncludeSchema).optional(),
}).strict();

export const CoordSelectSchema: z.ZodType<Prisma.CoordSelect> = z.object({
  id: z.boolean().optional(),
  longitude: z.boolean().optional(),
  latitude: z.boolean().optional(),
  street: z.boolean().optional(),
  city: z.boolean().optional(),
  country: z.boolean().optional(),
  postalCode: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  stepId: z.boolean().optional(),
  step: z.union([z.boolean(),z.lazy(() => StepArgsSchema)]).optional(),
}).strict()

// STEP
//------------------------------------------------------

export const StepIncludeSchema: z.ZodType<Prisma.StepInclude> = z.object({
  coord: z.union([z.boolean(),z.lazy(() => CoordArgsSchema)]).optional(),
  plan: z.union([z.boolean(),z.lazy(() => PlanArgsSchema)]).optional(),
}).strict()

export const StepArgsSchema: z.ZodType<Prisma.StepDefaultArgs> = z.object({
  select: z.lazy(() => StepSelectSchema).optional(),
  include: z.lazy(() => StepIncludeSchema).optional(),
}).strict();

export const StepSelectSchema: z.ZodType<Prisma.StepSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  startDate: z.boolean().optional(),
  endDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  planId: z.boolean().optional(),
  coord: z.union([z.boolean(),z.lazy(() => CoordArgsSchema)]).optional(),
  plan: z.union([z.boolean(),z.lazy(() => PlanArgsSchema)]).optional(),
}).strict()

// PLAN
//------------------------------------------------------

export const PlanIncludeSchema: z.ZodType<Prisma.PlanInclude> = z.object({
  steps: z.union([z.boolean(),z.lazy(() => StepFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserWithPermissionsFindManyArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => PermissionInvitationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PlanArgsSchema: z.ZodType<Prisma.PlanDefaultArgs> = z.object({
  select: z.lazy(() => PlanSelectSchema).optional(),
  include: z.lazy(() => PlanIncludeSchema).optional(),
}).strict();

export const PlanCountOutputTypeArgsSchema: z.ZodType<Prisma.PlanCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PlanCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PlanCountOutputTypeSelectSchema: z.ZodType<Prisma.PlanCountOutputTypeSelect> = z.object({
  steps: z.boolean().optional(),
  users: z.boolean().optional(),
  invitations: z.boolean().optional(),
}).strict();

export const PlanSelectSchema: z.ZodType<Prisma.PlanSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  departureDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  steps: z.union([z.boolean(),z.lazy(() => StepFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => UserWithPermissionsFindManyArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => PermissionInvitationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  plans: z.union([z.boolean(),z.lazy(() => UserWithPermissionsFindManyArgsSchema)]).optional(),
  passwordForgotten: z.union([z.boolean(),z.lazy(() => PasswordForgottenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  plans: z.boolean().optional(),
  passwordForgotten: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  isEmailValid: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  lastLoginOn: z.boolean().optional(),
  plans: z.union([z.boolean(),z.lazy(() => UserWithPermissionsFindManyArgsSchema)]).optional(),
  passwordForgotten: z.union([z.boolean(),z.lazy(() => PasswordForgottenFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PASSWORD FORGOTTEN
//------------------------------------------------------

export const PasswordForgottenIncludeSchema: z.ZodType<Prisma.PasswordForgottenInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PasswordForgottenArgsSchema: z.ZodType<Prisma.PasswordForgottenDefaultArgs> = z.object({
  select: z.lazy(() => PasswordForgottenSelectSchema).optional(),
  include: z.lazy(() => PasswordForgottenIncludeSchema).optional(),
}).strict();

export const PasswordForgottenSelectSchema: z.ZodType<Prisma.PasswordForgottenSelect> = z.object({
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  isUsed: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// PERMISSION INVITATION
//------------------------------------------------------

export const PermissionInvitationIncludeSchema: z.ZodType<Prisma.PermissionInvitationInclude> = z.object({
  plan: z.union([z.boolean(),z.lazy(() => PlanArgsSchema)]).optional(),
}).strict()

export const PermissionInvitationArgsSchema: z.ZodType<Prisma.PermissionInvitationDefaultArgs> = z.object({
  select: z.lazy(() => PermissionInvitationSelectSchema).optional(),
  include: z.lazy(() => PermissionInvitationIncludeSchema).optional(),
}).strict();

export const PermissionInvitationSelectSchema: z.ZodType<Prisma.PermissionInvitationSelect> = z.object({
  token: z.boolean().optional(),
  email: z.boolean().optional(),
  invitedBy: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  hasWritePermission: z.boolean().optional(),
  isUsed: z.boolean().optional(),
  planId: z.boolean().optional(),
  plan: z.union([z.boolean(),z.lazy(() => PlanArgsSchema)]).optional(),
}).strict()

// USER WITH PERMISSIONS
//------------------------------------------------------

export const UserWithPermissionsIncludeSchema: z.ZodType<Prisma.UserWithPermissionsInclude> = z.object({
  plan: z.union([z.boolean(),z.lazy(() => PlanArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserWithPermissionsArgsSchema: z.ZodType<Prisma.UserWithPermissionsDefaultArgs> = z.object({
  select: z.lazy(() => UserWithPermissionsSelectSchema).optional(),
  include: z.lazy(() => UserWithPermissionsIncludeSchema).optional(),
}).strict();

export const UserWithPermissionsSelectSchema: z.ZodType<Prisma.UserWithPermissionsSelect> = z.object({
  planId: z.boolean().optional(),
  userId: z.boolean().optional(),
  hasWritePermission: z.boolean().optional(),
  isCreator: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  plan: z.union([z.boolean(),z.lazy(() => PlanArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const CoordWhereInputSchema: z.ZodType<Prisma.CoordWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CoordWhereInputSchema),z.lazy(() => CoordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordWhereInputSchema),z.lazy(() => CoordWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  longitude: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  stepId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  step: z.union([ z.lazy(() => StepRelationFilterSchema),z.lazy(() => StepWhereInputSchema) ]).optional(),
}).strict();

export const CoordOrderByWithRelationInputSchema: z.ZodType<Prisma.CoordOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stepId: z.lazy(() => SortOrderSchema).optional(),
  step: z.lazy(() => StepOrderByWithRelationInputSchema).optional()
}).strict();

export const CoordWhereUniqueInputSchema: z.ZodType<Prisma.CoordWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    stepId: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    stepId: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  stepId: z.string().optional(),
  AND: z.union([ z.lazy(() => CoordWhereInputSchema),z.lazy(() => CoordWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordWhereInputSchema),z.lazy(() => CoordWhereInputSchema).array() ]).optional(),
  longitude: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  step: z.union([ z.lazy(() => StepRelationFilterSchema),z.lazy(() => StepWhereInputSchema) ]).optional(),
}).strict());

export const CoordOrderByWithAggregationInputSchema: z.ZodType<Prisma.CoordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stepId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CoordCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CoordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CoordMinOrderByAggregateInputSchema).optional()
}).strict();

export const CoordScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CoordScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CoordScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CoordScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CoordScalarWhereWithAggregatesInputSchema),z.lazy(() => CoordScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  longitude: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  latitude: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  street: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  city: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  country: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  postalCode: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  stepId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const StepWhereInputSchema: z.ZodType<Prisma.StepWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StepWhereInputSchema),z.lazy(() => StepWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StepWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StepWhereInputSchema),z.lazy(() => StepWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coord: z.union([ z.lazy(() => CoordNullableRelationFilterSchema),z.lazy(() => CoordWhereInputSchema) ]).optional().nullable(),
  plan: z.union([ z.lazy(() => PlanRelationFilterSchema),z.lazy(() => PlanWhereInputSchema) ]).optional(),
}).strict();

export const StepOrderByWithRelationInputSchema: z.ZodType<Prisma.StepOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  coord: z.lazy(() => CoordOrderByWithRelationInputSchema).optional(),
  plan: z.lazy(() => PlanOrderByWithRelationInputSchema).optional()
}).strict();

export const StepWhereUniqueInputSchema: z.ZodType<Prisma.StepWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => StepWhereInputSchema),z.lazy(() => StepWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StepWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StepWhereInputSchema),z.lazy(() => StepWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  coord: z.union([ z.lazy(() => CoordNullableRelationFilterSchema),z.lazy(() => CoordWhereInputSchema) ]).optional().nullable(),
  plan: z.union([ z.lazy(() => PlanRelationFilterSchema),z.lazy(() => PlanWhereInputSchema) ]).optional(),
}).strict());

export const StepOrderByWithAggregationInputSchema: z.ZodType<Prisma.StepOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => StepCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => StepMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => StepMinOrderByAggregateInputSchema).optional()
}).strict();

export const StepScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.StepScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => StepScalarWhereWithAggregatesInputSchema),z.lazy(() => StepScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => StepScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StepScalarWhereWithAggregatesInputSchema),z.lazy(() => StepScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  planId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PlanWhereInputSchema: z.ZodType<Prisma.PlanWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlanWhereInputSchema),z.lazy(() => PlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlanWhereInputSchema),z.lazy(() => PlanWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  departureDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  steps: z.lazy(() => StepListRelationFilterSchema).optional(),
  users: z.lazy(() => UserWithPermissionsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationListRelationFilterSchema).optional()
}).strict();

export const PlanOrderByWithRelationInputSchema: z.ZodType<Prisma.PlanOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  departureDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  steps: z.lazy(() => StepOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PlanWhereUniqueInputSchema: z.ZodType<Prisma.PlanWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PlanWhereInputSchema),z.lazy(() => PlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlanWhereInputSchema),z.lazy(() => PlanWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  departureDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  steps: z.lazy(() => StepListRelationFilterSchema).optional(),
  users: z.lazy(() => UserWithPermissionsListRelationFilterSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationListRelationFilterSchema).optional()
}).strict());

export const PlanOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlanOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  departureDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlanCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlanMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlanMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlanScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlanScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlanScalarWhereWithAggregatesInputSchema),z.lazy(() => PlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlanScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlanScalarWhereWithAggregatesInputSchema),z.lazy(() => PlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  departureDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isEmailValid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastLoginOn: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsListRelationFilterSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isEmailValid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginOn: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  plans: z.lazy(() => UserWithPermissionsOrderByRelationAggregateInputSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string()
  }),
  z.object({
    id: z.string().cuid(),
    email: z.string().email({ message: 'Invalid email address' }),
  }),
  z.object({
    id: z.string().cuid(),
    username: z.string(),
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string(),
  }),
  z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isEmailValid: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  lastLoginOn: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsListRelationFilterSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isEmailValid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginOn: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isEmailValid: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  lastLoginOn: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PasswordForgottenWhereInputSchema: z.ZodType<Prisma.PasswordForgottenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordForgottenWhereInputSchema),z.lazy(() => PasswordForgottenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordForgottenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordForgottenWhereInputSchema),z.lazy(() => PasswordForgottenWhereInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PasswordForgottenOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordForgottenOrderByWithRelationInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PasswordForgottenWhereUniqueInputSchema: z.ZodType<Prisma.PasswordForgottenWhereUniqueInput> = z.object({
  token: z.string()
})
.and(z.object({
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => PasswordForgottenWhereInputSchema),z.lazy(() => PasswordForgottenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordForgottenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordForgottenWhereInputSchema),z.lazy(() => PasswordForgottenWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PasswordForgottenOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordForgottenOrderByWithAggregationInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PasswordForgottenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasswordForgottenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasswordForgottenMinOrderByAggregateInputSchema).optional()
}).strict();

export const PasswordForgottenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordForgottenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordForgottenScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordForgottenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordForgottenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordForgottenScalarWhereWithAggregatesInputSchema),z.lazy(() => PasswordForgottenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PermissionInvitationWhereInputSchema: z.ZodType<Prisma.PermissionInvitationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionInvitationWhereInputSchema),z.lazy(() => PermissionInvitationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionInvitationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionInvitationWhereInputSchema),z.lazy(() => PermissionInvitationWhereInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  plan: z.union([ z.lazy(() => PlanRelationFilterSchema),z.lazy(() => PlanWhereInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionInvitationOrderByWithRelationInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  plan: z.lazy(() => PlanOrderByWithRelationInputSchema).optional()
}).strict();

export const PermissionInvitationWhereUniqueInputSchema: z.ZodType<Prisma.PermissionInvitationWhereUniqueInput> = z.union([
  z.object({
    email_planId: z.lazy(() => PermissionInvitationEmailPlanIdCompoundUniqueInputSchema),
    token: z.string()
  }),
  z.object({
    email_planId: z.lazy(() => PermissionInvitationEmailPlanIdCompoundUniqueInputSchema),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  token: z.string().optional(),
  email_planId: z.lazy(() => PermissionInvitationEmailPlanIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PermissionInvitationWhereInputSchema),z.lazy(() => PermissionInvitationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionInvitationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionInvitationWhereInputSchema),z.lazy(() => PermissionInvitationWhereInputSchema).array() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string().email({ message: 'Invalid email address' }) ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string().email({ message: 'Invalid email address' }) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  plan: z.union([ z.lazy(() => PlanRelationFilterSchema),z.lazy(() => PlanWhereInputSchema) ]).optional(),
}).strict());

export const PermissionInvitationOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionInvitationOrderByWithAggregationInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionInvitationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionInvitationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionInvitationMinOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionInvitationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionInvitationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionInvitationScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionInvitationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionInvitationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionInvitationScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionInvitationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  planId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWithPermissionsWhereInputSchema: z.ZodType<Prisma.UserWithPermissionsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWithPermissionsWhereInputSchema),z.lazy(() => UserWithPermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWithPermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWithPermissionsWhereInputSchema),z.lazy(() => UserWithPermissionsWhereInputSchema).array() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCreator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  plan: z.union([ z.lazy(() => PlanRelationFilterSchema),z.lazy(() => PlanWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsOrderByWithRelationInputSchema: z.ZodType<Prisma.UserWithPermissionsOrderByWithRelationInput> = z.object({
  planId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isCreator: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  plan: z.lazy(() => PlanOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWithPermissionsWhereUniqueInputSchema: z.ZodType<Prisma.UserWithPermissionsWhereUniqueInput> = z.object({
  userId_planId: z.lazy(() => UserWithPermissionsUserIdPlanIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_planId: z.lazy(() => UserWithPermissionsUserIdPlanIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserWithPermissionsWhereInputSchema),z.lazy(() => UserWithPermissionsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWithPermissionsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWithPermissionsWhereInputSchema),z.lazy(() => UserWithPermissionsWhereInputSchema).array() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCreator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  plan: z.union([ z.lazy(() => PlanRelationFilterSchema),z.lazy(() => PlanWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserWithPermissionsOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserWithPermissionsOrderByWithAggregationInput> = z.object({
  planId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isCreator: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserWithPermissionsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserWithPermissionsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserWithPermissionsMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserWithPermissionsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserWithPermissionsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserWithPermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserWithPermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWithPermissionsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWithPermissionsScalarWhereWithAggregatesInputSchema),z.lazy(() => UserWithPermissionsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  planId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  isCreator: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CoordCreateInputSchema: z.ZodType<Prisma.CoordCreateInput> = z.object({
  id: z.string().cuid().optional(),
  longitude: z.string(),
  latitude: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  step: z.lazy(() => StepCreateNestedOneWithoutCoordInputSchema)
}).strict();

export const CoordUncheckedCreateInputSchema: z.ZodType<Prisma.CoordUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  longitude: z.string(),
  latitude: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stepId: z.string()
}).strict();

export const CoordUpdateInputSchema: z.ZodType<Prisma.CoordUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  step: z.lazy(() => StepUpdateOneRequiredWithoutCoordNestedInputSchema).optional()
}).strict();

export const CoordUncheckedUpdateInputSchema: z.ZodType<Prisma.CoordUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stepId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordCreateManyInputSchema: z.ZodType<Prisma.CoordCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  longitude: z.string(),
  latitude: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stepId: z.string()
}).strict();

export const CoordUpdateManyMutationInputSchema: z.ZodType<Prisma.CoordUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CoordUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  stepId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StepCreateInputSchema: z.ZodType<Prisma.StepCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  coord: z.lazy(() => CoordCreateNestedOneWithoutStepInputSchema).optional(),
  plan: z.lazy(() => PlanCreateNestedOneWithoutStepsInputSchema)
}).strict();

export const StepUncheckedCreateInputSchema: z.ZodType<Prisma.StepUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  planId: z.string(),
  coord: z.lazy(() => CoordUncheckedCreateNestedOneWithoutStepInputSchema).optional()
}).strict();

export const StepUpdateInputSchema: z.ZodType<Prisma.StepUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coord: z.lazy(() => CoordUpdateOneWithoutStepNestedInputSchema).optional(),
  plan: z.lazy(() => PlanUpdateOneRequiredWithoutStepsNestedInputSchema).optional()
}).strict();

export const StepUncheckedUpdateInputSchema: z.ZodType<Prisma.StepUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  coord: z.lazy(() => CoordUncheckedUpdateOneWithoutStepNestedInputSchema).optional()
}).strict();

export const StepCreateManyInputSchema: z.ZodType<Prisma.StepCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  planId: z.string()
}).strict();

export const StepUpdateManyMutationInputSchema: z.ZodType<Prisma.StepUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StepUncheckedUpdateManyInputSchema: z.ZodType<Prisma.StepUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlanCreateInputSchema: z.ZodType<Prisma.PlanCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  steps: z.lazy(() => StepCreateNestedManyWithoutPlanInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsCreateNestedManyWithoutPlanInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanUncheckedCreateInputSchema: z.ZodType<Prisma.PlanUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  steps: z.lazy(() => StepUncheckedCreateNestedManyWithoutPlanInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsUncheckedCreateNestedManyWithoutPlanInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanUpdateInputSchema: z.ZodType<Prisma.PlanUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  steps: z.lazy(() => StepUpdateManyWithoutPlanNestedInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsUpdateManyWithoutPlanNestedInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const PlanUncheckedUpdateInputSchema: z.ZodType<Prisma.PlanUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  steps: z.lazy(() => StepUncheckedUpdateManyWithoutPlanNestedInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutPlanNestedInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const PlanCreateManyInputSchema: z.ZodType<Prisma.PlanCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PlanUpdateManyMutationInputSchema: z.ZodType<Prisma.PlanUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlanUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlanUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsCreateNestedManyWithoutUserInputSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsUpdateManyWithoutUserNestedInputSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  passwordForgotten: z.lazy(() => PasswordForgottenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PasswordForgottenCreateInputSchema: z.ZodType<Prisma.PasswordForgottenCreateInput> = z.object({
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  isUsed: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPasswordForgottenInputSchema)
}).strict();

export const PasswordForgottenUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedCreateInput> = z.object({
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  isUsed: z.boolean().optional(),
  userId: z.string()
}).strict();

export const PasswordForgottenUpdateInputSchema: z.ZodType<Prisma.PasswordForgottenUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPasswordForgottenNestedInputSchema).optional()
}).strict();

export const PasswordForgottenUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordForgottenCreateManyInputSchema: z.ZodType<Prisma.PasswordForgottenCreateManyInput> = z.object({
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  isUsed: z.boolean().optional(),
  userId: z.string()
}).strict();

export const PasswordForgottenUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordForgottenUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordForgottenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedUpdateManyInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationCreateInputSchema: z.ZodType<Prisma.PermissionInvitationCreateInput> = z.object({
  token: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date().optional(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean().optional(),
  plan: z.lazy(() => PlanCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const PermissionInvitationUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedCreateInput> = z.object({
  token: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date().optional(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean().optional(),
  planId: z.string()
}).strict();

export const PermissionInvitationUpdateInputSchema: z.ZodType<Prisma.PermissionInvitationUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => PlanUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const PermissionInvitationUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedUpdateInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationCreateManyInputSchema: z.ZodType<Prisma.PermissionInvitationCreateManyInput> = z.object({
  token: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date().optional(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean().optional(),
  planId: z.string()
}).strict();

export const PermissionInvitationUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionInvitationUpdateManyMutationInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedUpdateManyInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsCreateInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateInput> = z.object({
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  plan: z.lazy(() => PlanCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutPlansInputSchema)
}).strict();

export const UserWithPermissionsUncheckedCreateInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedCreateInput> = z.object({
  planId: z.string(),
  userId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserWithPermissionsUpdateInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateInput> = z.object({
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => PlanUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPlansNestedInputSchema).optional()
}).strict();

export const UserWithPermissionsUncheckedUpdateInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateInput> = z.object({
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsCreateManyInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyInput> = z.object({
  planId: z.string(),
  userId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserWithPermissionsUpdateManyMutationInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateManyMutationInput> = z.object({
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateManyInput> = z.object({
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StepRelationFilterSchema: z.ZodType<Prisma.StepRelationFilter> = z.object({
  is: z.lazy(() => StepWhereInputSchema).optional(),
  isNot: z.lazy(() => StepWhereInputSchema).optional()
}).strict();

export const CoordCountOrderByAggregateInputSchema: z.ZodType<Prisma.CoordCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stepId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CoordMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stepId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CoordMinOrderByAggregateInputSchema: z.ZodType<Prisma.CoordMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  stepId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const CoordNullableRelationFilterSchema: z.ZodType<Prisma.CoordNullableRelationFilter> = z.object({
  is: z.lazy(() => CoordWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CoordWhereInputSchema).optional().nullable()
}).strict();

export const PlanRelationFilterSchema: z.ZodType<Prisma.PlanRelationFilter> = z.object({
  is: z.lazy(() => PlanWhereInputSchema).optional(),
  isNot: z.lazy(() => PlanWhereInputSchema).optional()
}).strict();

export const StepCountOrderByAggregateInputSchema: z.ZodType<Prisma.StepCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StepMaxOrderByAggregateInputSchema: z.ZodType<Prisma.StepMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StepMinOrderByAggregateInputSchema: z.ZodType<Prisma.StepMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  startDate: z.lazy(() => SortOrderSchema).optional(),
  endDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StepListRelationFilterSchema: z.ZodType<Prisma.StepListRelationFilter> = z.object({
  every: z.lazy(() => StepWhereInputSchema).optional(),
  some: z.lazy(() => StepWhereInputSchema).optional(),
  none: z.lazy(() => StepWhereInputSchema).optional()
}).strict();

export const UserWithPermissionsListRelationFilterSchema: z.ZodType<Prisma.UserWithPermissionsListRelationFilter> = z.object({
  every: z.lazy(() => UserWithPermissionsWhereInputSchema).optional(),
  some: z.lazy(() => UserWithPermissionsWhereInputSchema).optional(),
  none: z.lazy(() => UserWithPermissionsWhereInputSchema).optional()
}).strict();

export const PermissionInvitationListRelationFilterSchema: z.ZodType<Prisma.PermissionInvitationListRelationFilter> = z.object({
  every: z.lazy(() => PermissionInvitationWhereInputSchema).optional(),
  some: z.lazy(() => PermissionInvitationWhereInputSchema).optional(),
  none: z.lazy(() => PermissionInvitationWhereInputSchema).optional()
}).strict();

export const StepOrderByRelationAggregateInputSchema: z.ZodType<Prisma.StepOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWithPermissionsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserWithPermissionsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionInvitationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PermissionInvitationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlanCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlanCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  departureDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlanMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlanMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  departureDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlanMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlanMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  departureDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PasswordForgottenListRelationFilterSchema: z.ZodType<Prisma.PasswordForgottenListRelationFilter> = z.object({
  every: z.lazy(() => PasswordForgottenWhereInputSchema).optional(),
  some: z.lazy(() => PasswordForgottenWhereInputSchema).optional(),
  none: z.lazy(() => PasswordForgottenWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const PasswordForgottenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasswordForgottenOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isEmailValid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginOn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isEmailValid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginOn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  isEmailValid: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  lastLoginOn: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PasswordForgottenCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordForgottenCountOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordForgottenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordForgottenMaxOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PasswordForgottenMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordForgottenMinOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionInvitationEmailPlanIdCompoundUniqueInputSchema: z.ZodType<Prisma.PermissionInvitationEmailPlanIdCompoundUniqueInput> = z.object({
  email: z.string(),
  planId: z.string()
}).strict();

export const PermissionInvitationCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionInvitationCountOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionInvitationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionInvitationMaxOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionInvitationMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionInvitationMinOrderByAggregateInput> = z.object({
  token: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  invitedBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isUsed: z.lazy(() => SortOrderSchema).optional(),
  planId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWithPermissionsUserIdPlanIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserWithPermissionsUserIdPlanIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  planId: z.string()
}).strict();

export const UserWithPermissionsCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserWithPermissionsCountOrderByAggregateInput> = z.object({
  planId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isCreator: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWithPermissionsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserWithPermissionsMaxOrderByAggregateInput> = z.object({
  planId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isCreator: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserWithPermissionsMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserWithPermissionsMinOrderByAggregateInput> = z.object({
  planId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  hasWritePermission: z.lazy(() => SortOrderSchema).optional(),
  isCreator: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StepCreateNestedOneWithoutCoordInputSchema: z.ZodType<Prisma.StepCreateNestedOneWithoutCoordInput> = z.object({
  create: z.union([ z.lazy(() => StepCreateWithoutCoordInputSchema),z.lazy(() => StepUncheckedCreateWithoutCoordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StepCreateOrConnectWithoutCoordInputSchema).optional(),
  connect: z.lazy(() => StepWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const StepUpdateOneRequiredWithoutCoordNestedInputSchema: z.ZodType<Prisma.StepUpdateOneRequiredWithoutCoordNestedInput> = z.object({
  create: z.union([ z.lazy(() => StepCreateWithoutCoordInputSchema),z.lazy(() => StepUncheckedCreateWithoutCoordInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => StepCreateOrConnectWithoutCoordInputSchema).optional(),
  upsert: z.lazy(() => StepUpsertWithoutCoordInputSchema).optional(),
  connect: z.lazy(() => StepWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => StepUpdateToOneWithWhereWithoutCoordInputSchema),z.lazy(() => StepUpdateWithoutCoordInputSchema),z.lazy(() => StepUncheckedUpdateWithoutCoordInputSchema) ]).optional(),
}).strict();

export const CoordCreateNestedOneWithoutStepInputSchema: z.ZodType<Prisma.CoordCreateNestedOneWithoutStepInput> = z.object({
  create: z.union([ z.lazy(() => CoordCreateWithoutStepInputSchema),z.lazy(() => CoordUncheckedCreateWithoutStepInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordCreateOrConnectWithoutStepInputSchema).optional(),
  connect: z.lazy(() => CoordWhereUniqueInputSchema).optional()
}).strict();

export const PlanCreateNestedOneWithoutStepsInputSchema: z.ZodType<Prisma.PlanCreateNestedOneWithoutStepsInput> = z.object({
  create: z.union([ z.lazy(() => PlanCreateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutStepsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanCreateOrConnectWithoutStepsInputSchema).optional(),
  connect: z.lazy(() => PlanWhereUniqueInputSchema).optional()
}).strict();

export const CoordUncheckedCreateNestedOneWithoutStepInputSchema: z.ZodType<Prisma.CoordUncheckedCreateNestedOneWithoutStepInput> = z.object({
  create: z.union([ z.lazy(() => CoordCreateWithoutStepInputSchema),z.lazy(() => CoordUncheckedCreateWithoutStepInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordCreateOrConnectWithoutStepInputSchema).optional(),
  connect: z.lazy(() => CoordWhereUniqueInputSchema).optional()
}).strict();

export const CoordUpdateOneWithoutStepNestedInputSchema: z.ZodType<Prisma.CoordUpdateOneWithoutStepNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordCreateWithoutStepInputSchema),z.lazy(() => CoordUncheckedCreateWithoutStepInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordCreateOrConnectWithoutStepInputSchema).optional(),
  upsert: z.lazy(() => CoordUpsertWithoutStepInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CoordWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CoordWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CoordWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CoordUpdateToOneWithWhereWithoutStepInputSchema),z.lazy(() => CoordUpdateWithoutStepInputSchema),z.lazy(() => CoordUncheckedUpdateWithoutStepInputSchema) ]).optional(),
}).strict();

export const PlanUpdateOneRequiredWithoutStepsNestedInputSchema: z.ZodType<Prisma.PlanUpdateOneRequiredWithoutStepsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlanCreateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutStepsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanCreateOrConnectWithoutStepsInputSchema).optional(),
  upsert: z.lazy(() => PlanUpsertWithoutStepsInputSchema).optional(),
  connect: z.lazy(() => PlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlanUpdateToOneWithWhereWithoutStepsInputSchema),z.lazy(() => PlanUpdateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutStepsInputSchema) ]).optional(),
}).strict();

export const CoordUncheckedUpdateOneWithoutStepNestedInputSchema: z.ZodType<Prisma.CoordUncheckedUpdateOneWithoutStepNestedInput> = z.object({
  create: z.union([ z.lazy(() => CoordCreateWithoutStepInputSchema),z.lazy(() => CoordUncheckedCreateWithoutStepInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CoordCreateOrConnectWithoutStepInputSchema).optional(),
  upsert: z.lazy(() => CoordUpsertWithoutStepInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CoordWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CoordWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CoordWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CoordUpdateToOneWithWhereWithoutStepInputSchema),z.lazy(() => CoordUpdateWithoutStepInputSchema),z.lazy(() => CoordUncheckedUpdateWithoutStepInputSchema) ]).optional(),
}).strict();

export const StepCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.StepCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => StepCreateWithoutPlanInputSchema),z.lazy(() => StepCreateWithoutPlanInputSchema).array(),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema),z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StepCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionInvitationCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema).array(),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionInvitationCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StepUncheckedCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.StepUncheckedCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => StepCreateWithoutPlanInputSchema),z.lazy(() => StepCreateWithoutPlanInputSchema).array(),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema),z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StepCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermissionInvitationUncheckedCreateNestedManyWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedCreateNestedManyWithoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema).array(),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionInvitationCreateManyPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StepUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.StepUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => StepCreateWithoutPlanInputSchema),z.lazy(() => StepCreateWithoutPlanInputSchema).array(),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema),z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StepUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => StepUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StepCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StepUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => StepUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StepUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => StepUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StepScalarWhereInputSchema),z.lazy(() => StepScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserWithPermissionsScalarWhereInputSchema),z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionInvitationUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.PermissionInvitationUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema).array(),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionInvitationUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionInvitationCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionInvitationUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionInvitationUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionInvitationScalarWhereInputSchema),z.lazy(() => PermissionInvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const StepUncheckedUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.StepUncheckedUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => StepCreateWithoutPlanInputSchema),z.lazy(() => StepCreateWithoutPlanInputSchema).array(),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema),z.lazy(() => StepCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => StepUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => StepUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => StepCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => StepWhereUniqueInputSchema),z.lazy(() => StepWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => StepUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => StepUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => StepUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => StepUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => StepScalarWhereInputSchema),z.lazy(() => StepScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserWithPermissionsScalarWhereInputSchema),z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionInvitationUncheckedUpdateManyWithoutPlanNestedInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedUpdateManyWithoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema).array(),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema),z.lazy(() => PermissionInvitationCreateOrConnectWithoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermissionInvitationUpsertWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUpsertWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermissionInvitationCreateManyPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermissionInvitationWhereUniqueInputSchema),z.lazy(() => PermissionInvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermissionInvitationUpdateWithWhereUniqueWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUpdateWithWhereUniqueWithoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermissionInvitationUpdateManyWithWhereWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUpdateManyWithWhereWithoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermissionInvitationScalarWhereInputSchema),z.lazy(() => PermissionInvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordForgottenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema).array(),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordForgottenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PasswordForgottenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema).array(),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordForgottenCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserWithPermissionsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserWithPermissionsScalarWhereInputSchema),z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasswordForgottenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordForgottenUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema).array(),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasswordForgottenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasswordForgottenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordForgottenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasswordForgottenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasswordForgottenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasswordForgottenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PasswordForgottenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasswordForgottenScalarWhereInputSchema),z.lazy(() => PasswordForgottenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema).array(),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserWithPermissionsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserWithPermissionsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),z.lazy(() => UserWithPermissionsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserWithPermissionsScalarWhereInputSchema),z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PasswordForgottenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema).array(),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema),z.lazy(() => PasswordForgottenCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PasswordForgottenUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasswordForgottenUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PasswordForgottenCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PasswordForgottenWhereUniqueInputSchema),z.lazy(() => PasswordForgottenWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PasswordForgottenUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PasswordForgottenUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PasswordForgottenUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PasswordForgottenUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PasswordForgottenScalarWhereInputSchema),z.lazy(() => PasswordForgottenScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordForgottenInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordForgottenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordForgottenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutPasswordForgottenNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordForgottenNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordForgottenInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordForgottenInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPasswordForgottenInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPasswordForgottenInputSchema),z.lazy(() => UserUpdateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordForgottenInputSchema) ]).optional(),
}).strict();

export const PlanCreateNestedOneWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanCreateNestedOneWithoutInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => PlanCreateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanCreateOrConnectWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => PlanWhereUniqueInputSchema).optional()
}).strict();

export const PlanUpdateOneRequiredWithoutInvitationsNestedInputSchema: z.ZodType<Prisma.PlanUpdateOneRequiredWithoutInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlanCreateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanCreateOrConnectWithoutInvitationsInputSchema).optional(),
  upsert: z.lazy(() => PlanUpsertWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => PlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlanUpdateToOneWithWhereWithoutInvitationsInputSchema),z.lazy(() => PlanUpdateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutInvitationsInputSchema) ]).optional(),
}).strict();

export const PlanCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.PlanCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => PlanCreateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => PlanWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPlansInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPlansInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlansInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPlansInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PlanUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.PlanUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlanCreateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PlanCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => PlanUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => PlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PlanUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => PlanUpdateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPlansNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPlansNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlansInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPlansInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPlansInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPlansInputSchema),z.lazy(() => UserUpdateWithoutPlansInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlansInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StepCreateWithoutCoordInputSchema: z.ZodType<Prisma.StepCreateWithoutCoordInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  plan: z.lazy(() => PlanCreateNestedOneWithoutStepsInputSchema)
}).strict();

export const StepUncheckedCreateWithoutCoordInputSchema: z.ZodType<Prisma.StepUncheckedCreateWithoutCoordInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  planId: z.string()
}).strict();

export const StepCreateOrConnectWithoutCoordInputSchema: z.ZodType<Prisma.StepCreateOrConnectWithoutCoordInput> = z.object({
  where: z.lazy(() => StepWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StepCreateWithoutCoordInputSchema),z.lazy(() => StepUncheckedCreateWithoutCoordInputSchema) ]),
}).strict();

export const StepUpsertWithoutCoordInputSchema: z.ZodType<Prisma.StepUpsertWithoutCoordInput> = z.object({
  update: z.union([ z.lazy(() => StepUpdateWithoutCoordInputSchema),z.lazy(() => StepUncheckedUpdateWithoutCoordInputSchema) ]),
  create: z.union([ z.lazy(() => StepCreateWithoutCoordInputSchema),z.lazy(() => StepUncheckedCreateWithoutCoordInputSchema) ]),
  where: z.lazy(() => StepWhereInputSchema).optional()
}).strict();

export const StepUpdateToOneWithWhereWithoutCoordInputSchema: z.ZodType<Prisma.StepUpdateToOneWithWhereWithoutCoordInput> = z.object({
  where: z.lazy(() => StepWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => StepUpdateWithoutCoordInputSchema),z.lazy(() => StepUncheckedUpdateWithoutCoordInputSchema) ]),
}).strict();

export const StepUpdateWithoutCoordInputSchema: z.ZodType<Prisma.StepUpdateWithoutCoordInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => PlanUpdateOneRequiredWithoutStepsNestedInputSchema).optional()
}).strict();

export const StepUncheckedUpdateWithoutCoordInputSchema: z.ZodType<Prisma.StepUncheckedUpdateWithoutCoordInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordCreateWithoutStepInputSchema: z.ZodType<Prisma.CoordCreateWithoutStepInput> = z.object({
  id: z.string().cuid().optional(),
  longitude: z.string(),
  latitude: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CoordUncheckedCreateWithoutStepInputSchema: z.ZodType<Prisma.CoordUncheckedCreateWithoutStepInput> = z.object({
  id: z.string().cuid().optional(),
  longitude: z.string(),
  latitude: z.string(),
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CoordCreateOrConnectWithoutStepInputSchema: z.ZodType<Prisma.CoordCreateOrConnectWithoutStepInput> = z.object({
  where: z.lazy(() => CoordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CoordCreateWithoutStepInputSchema),z.lazy(() => CoordUncheckedCreateWithoutStepInputSchema) ]),
}).strict();

export const PlanCreateWithoutStepsInputSchema: z.ZodType<Prisma.PlanCreateWithoutStepsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserWithPermissionsCreateNestedManyWithoutPlanInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanUncheckedCreateWithoutStepsInputSchema: z.ZodType<Prisma.PlanUncheckedCreateWithoutStepsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserWithPermissionsUncheckedCreateNestedManyWithoutPlanInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanCreateOrConnectWithoutStepsInputSchema: z.ZodType<Prisma.PlanCreateOrConnectWithoutStepsInput> = z.object({
  where: z.lazy(() => PlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlanCreateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutStepsInputSchema) ]),
}).strict();

export const CoordUpsertWithoutStepInputSchema: z.ZodType<Prisma.CoordUpsertWithoutStepInput> = z.object({
  update: z.union([ z.lazy(() => CoordUpdateWithoutStepInputSchema),z.lazy(() => CoordUncheckedUpdateWithoutStepInputSchema) ]),
  create: z.union([ z.lazy(() => CoordCreateWithoutStepInputSchema),z.lazy(() => CoordUncheckedCreateWithoutStepInputSchema) ]),
  where: z.lazy(() => CoordWhereInputSchema).optional()
}).strict();

export const CoordUpdateToOneWithWhereWithoutStepInputSchema: z.ZodType<Prisma.CoordUpdateToOneWithWhereWithoutStepInput> = z.object({
  where: z.lazy(() => CoordWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CoordUpdateWithoutStepInputSchema),z.lazy(() => CoordUncheckedUpdateWithoutStepInputSchema) ]),
}).strict();

export const CoordUpdateWithoutStepInputSchema: z.ZodType<Prisma.CoordUpdateWithoutStepInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CoordUncheckedUpdateWithoutStepInputSchema: z.ZodType<Prisma.CoordUncheckedUpdateWithoutStepInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  street: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  city: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  postalCode: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlanUpsertWithoutStepsInputSchema: z.ZodType<Prisma.PlanUpsertWithoutStepsInput> = z.object({
  update: z.union([ z.lazy(() => PlanUpdateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutStepsInputSchema) ]),
  create: z.union([ z.lazy(() => PlanCreateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutStepsInputSchema) ]),
  where: z.lazy(() => PlanWhereInputSchema).optional()
}).strict();

export const PlanUpdateToOneWithWhereWithoutStepsInputSchema: z.ZodType<Prisma.PlanUpdateToOneWithWhereWithoutStepsInput> = z.object({
  where: z.lazy(() => PlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlanUpdateWithoutStepsInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutStepsInputSchema) ]),
}).strict();

export const PlanUpdateWithoutStepsInputSchema: z.ZodType<Prisma.PlanUpdateWithoutStepsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserWithPermissionsUpdateManyWithoutPlanNestedInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const PlanUncheckedUpdateWithoutStepsInputSchema: z.ZodType<Prisma.PlanUncheckedUpdateWithoutStepsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutPlanNestedInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const StepCreateWithoutPlanInputSchema: z.ZodType<Prisma.StepCreateWithoutPlanInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  coord: z.lazy(() => CoordCreateNestedOneWithoutStepInputSchema).optional()
}).strict();

export const StepUncheckedCreateWithoutPlanInputSchema: z.ZodType<Prisma.StepUncheckedCreateWithoutPlanInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  coord: z.lazy(() => CoordUncheckedCreateNestedOneWithoutStepInputSchema).optional()
}).strict();

export const StepCreateOrConnectWithoutPlanInputSchema: z.ZodType<Prisma.StepCreateOrConnectWithoutPlanInput> = z.object({
  where: z.lazy(() => StepWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => StepCreateWithoutPlanInputSchema),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const StepCreateManyPlanInputEnvelopeSchema: z.ZodType<Prisma.StepCreateManyPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => StepCreateManyPlanInputSchema),z.lazy(() => StepCreateManyPlanInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserWithPermissionsCreateWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateWithoutPlanInput> = z.object({
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPlansInputSchema)
}).strict();

export const UserWithPermissionsUncheckedCreateWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedCreateWithoutPlanInput> = z.object({
  userId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserWithPermissionsCreateOrConnectWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateOrConnectWithoutPlanInput> = z.object({
  where: z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const UserWithPermissionsCreateManyPlanInputEnvelopeSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserWithPermissionsCreateManyPlanInputSchema),z.lazy(() => UserWithPermissionsCreateManyPlanInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PermissionInvitationCreateWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationCreateWithoutPlanInput> = z.object({
  token: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date().optional(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean().optional()
}).strict();

export const PermissionInvitationUncheckedCreateWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedCreateWithoutPlanInput> = z.object({
  token: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date().optional(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean().optional()
}).strict();

export const PermissionInvitationCreateOrConnectWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationCreateOrConnectWithoutPlanInput> = z.object({
  where: z.lazy(() => PermissionInvitationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const PermissionInvitationCreateManyPlanInputEnvelopeSchema: z.ZodType<Prisma.PermissionInvitationCreateManyPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermissionInvitationCreateManyPlanInputSchema),z.lazy(() => PermissionInvitationCreateManyPlanInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const StepUpsertWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.StepUpsertWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => StepWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => StepUpdateWithoutPlanInputSchema),z.lazy(() => StepUncheckedUpdateWithoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => StepCreateWithoutPlanInputSchema),z.lazy(() => StepUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const StepUpdateWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.StepUpdateWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => StepWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => StepUpdateWithoutPlanInputSchema),z.lazy(() => StepUncheckedUpdateWithoutPlanInputSchema) ]),
}).strict();

export const StepUpdateManyWithWhereWithoutPlanInputSchema: z.ZodType<Prisma.StepUpdateManyWithWhereWithoutPlanInput> = z.object({
  where: z.lazy(() => StepScalarWhereInputSchema),
  data: z.union([ z.lazy(() => StepUpdateManyMutationInputSchema),z.lazy(() => StepUncheckedUpdateManyWithoutPlanInputSchema) ]),
}).strict();

export const StepScalarWhereInputSchema: z.ZodType<Prisma.StepScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => StepScalarWhereInputSchema),z.lazy(() => StepScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => StepScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => StepScalarWhereInputSchema),z.lazy(() => StepScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWithPermissionsUpsertWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUpsertWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserWithPermissionsUpdateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedUpdateWithoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const UserWithPermissionsUpdateWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserWithPermissionsUpdateWithoutPlanInputSchema),z.lazy(() => UserWithPermissionsUncheckedUpdateWithoutPlanInputSchema) ]),
}).strict();

export const UserWithPermissionsUpdateManyWithWhereWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateManyWithWhereWithoutPlanInput> = z.object({
  where: z.lazy(() => UserWithPermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserWithPermissionsUpdateManyMutationInputSchema),z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutPlanInputSchema) ]),
}).strict();

export const UserWithPermissionsScalarWhereInputSchema: z.ZodType<Prisma.UserWithPermissionsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWithPermissionsScalarWhereInputSchema),z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWithPermissionsScalarWhereInputSchema),z.lazy(() => UserWithPermissionsScalarWhereInputSchema).array() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isCreator: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionInvitationUpsertWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUpsertWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => PermissionInvitationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermissionInvitationUpdateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedUpdateWithoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionInvitationCreateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedCreateWithoutPlanInputSchema) ]),
}).strict();

export const PermissionInvitationUpdateWithWhereUniqueWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUpdateWithWhereUniqueWithoutPlanInput> = z.object({
  where: z.lazy(() => PermissionInvitationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermissionInvitationUpdateWithoutPlanInputSchema),z.lazy(() => PermissionInvitationUncheckedUpdateWithoutPlanInputSchema) ]),
}).strict();

export const PermissionInvitationUpdateManyWithWhereWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUpdateManyWithWhereWithoutPlanInput> = z.object({
  where: z.lazy(() => PermissionInvitationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermissionInvitationUpdateManyMutationInputSchema),z.lazy(() => PermissionInvitationUncheckedUpdateManyWithoutPlanInputSchema) ]),
}).strict();

export const PermissionInvitationScalarWhereInputSchema: z.ZodType<Prisma.PermissionInvitationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionInvitationScalarWhereInputSchema),z.lazy(() => PermissionInvitationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionInvitationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionInvitationScalarWhereInputSchema),z.lazy(() => PermissionInvitationScalarWhereInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  invitedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hasWritePermission: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  planId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWithPermissionsCreateWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateWithoutUserInput> = z.object({
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  plan: z.lazy(() => PlanCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UserWithPermissionsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedCreateWithoutUserInput> = z.object({
  planId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserWithPermissionsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserWithPermissionsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserWithPermissionsCreateManyUserInputSchema),z.lazy(() => UserWithPermissionsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PasswordForgottenCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenCreateWithoutUserInput> = z.object({
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  isUsed: z.boolean().optional()
}).strict();

export const PasswordForgottenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedCreateWithoutUserInput> = z.object({
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  isUsed: z.boolean().optional()
}).strict();

export const PasswordForgottenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordForgottenWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PasswordForgottenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PasswordForgottenCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PasswordForgottenCreateManyUserInputSchema),z.lazy(() => PasswordForgottenCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserWithPermissionsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserWithPermissionsUpdateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserWithPermissionsCreateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserWithPermissionsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserWithPermissionsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserWithPermissionsUpdateWithoutUserInputSchema),z.lazy(() => UserWithPermissionsUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserWithPermissionsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserWithPermissionsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserWithPermissionsUpdateManyMutationInputSchema),z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PasswordForgottenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordForgottenWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PasswordForgottenUpdateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PasswordForgottenCreateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PasswordForgottenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordForgottenWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PasswordForgottenUpdateWithoutUserInputSchema),z.lazy(() => PasswordForgottenUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PasswordForgottenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordForgottenScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PasswordForgottenUpdateManyMutationInputSchema),z.lazy(() => PasswordForgottenUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PasswordForgottenScalarWhereInputSchema: z.ZodType<Prisma.PasswordForgottenScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasswordForgottenScalarWhereInputSchema),z.lazy(() => PasswordForgottenScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasswordForgottenScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasswordForgottenScalarWhereInputSchema),z.lazy(() => PasswordForgottenScalarWhereInputSchema).array() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  isUsed: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserCreateWithoutPasswordForgottenInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasswordForgottenInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordForgottenInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordForgottenInputSchema) ]),
}).strict();

export const UserUpsertWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserUpsertWithoutPasswordForgottenInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordForgottenInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedCreateWithoutPasswordForgottenInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasswordForgottenInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPasswordForgottenInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasswordForgottenInputSchema) ]),
}).strict();

export const UserUpdateWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserUpdateWithoutPasswordForgottenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPasswordForgottenInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPasswordForgottenInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  plans: z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PlanCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  steps: z.lazy(() => StepCreateNestedManyWithoutPlanInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  steps: z.lazy(() => StepUncheckedCreateNestedManyWithoutPlanInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanCreateOrConnectWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanCreateOrConnectWithoutInvitationsInput> = z.object({
  where: z.lazy(() => PlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlanCreateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutInvitationsInputSchema) ]),
}).strict();

export const PlanUpsertWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanUpsertWithoutInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => PlanUpdateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => PlanCreateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedCreateWithoutInvitationsInputSchema) ]),
  where: z.lazy(() => PlanWhereInputSchema).optional()
}).strict();

export const PlanUpdateToOneWithWhereWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanUpdateToOneWithWhereWithoutInvitationsInput> = z.object({
  where: z.lazy(() => PlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlanUpdateWithoutInvitationsInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutInvitationsInputSchema) ]),
}).strict();

export const PlanUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  steps: z.lazy(() => StepUpdateManyWithoutPlanNestedInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const PlanUncheckedUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.PlanUncheckedUpdateWithoutInvitationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  steps: z.lazy(() => StepUncheckedUpdateManyWithoutPlanNestedInputSchema).optional(),
  users: z.lazy(() => UserWithPermissionsUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const PlanCreateWithoutUsersInputSchema: z.ZodType<Prisma.PlanCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  steps: z.lazy(() => StepCreateNestedManyWithoutPlanInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.PlanUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  departureDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  steps: z.lazy(() => StepUncheckedCreateNestedManyWithoutPlanInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUncheckedCreateNestedManyWithoutPlanInputSchema).optional()
}).strict();

export const PlanCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.PlanCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => PlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlanCreateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserCreateWithoutPlansInputSchema: z.ZodType<Prisma.UserCreateWithoutPlansInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable(),
  passwordForgotten: z.lazy(() => PasswordForgottenCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPlansInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPlansInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string(),
  password: z.string(),
  isEmailValid: z.boolean(),
  createdAt: z.coerce.date().optional(),
  lastLoginOn: z.coerce.date().optional().nullable(),
  passwordForgotten: z.lazy(() => PasswordForgottenUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPlansInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPlansInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlansInputSchema) ]),
}).strict();

export const PlanUpsertWithoutUsersInputSchema: z.ZodType<Prisma.PlanUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => PlanUpdateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => PlanCreateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => PlanWhereInputSchema).optional()
}).strict();

export const PlanUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.PlanUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => PlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PlanUpdateWithoutUsersInputSchema),z.lazy(() => PlanUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const PlanUpdateWithoutUsersInputSchema: z.ZodType<Prisma.PlanUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  steps: z.lazy(() => StepUpdateManyWithoutPlanNestedInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const PlanUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.PlanUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  departureDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  steps: z.lazy(() => StepUncheckedUpdateManyWithoutPlanNestedInputSchema).optional(),
  invitations: z.lazy(() => PermissionInvitationUncheckedUpdateManyWithoutPlanNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutPlansInputSchema: z.ZodType<Prisma.UserUpsertWithoutPlansInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPlansInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlansInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPlansInputSchema),z.lazy(() => UserUncheckedCreateWithoutPlansInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPlansInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPlansInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPlansInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPlansInputSchema) ]),
}).strict();

export const UserUpdateWithoutPlansInputSchema: z.ZodType<Prisma.UserUpdateWithoutPlansInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordForgotten: z.lazy(() => PasswordForgottenUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPlansInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPlansInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isEmailValid: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  lastLoginOn: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  passwordForgotten: z.lazy(() => PasswordForgottenUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const StepCreateManyPlanInputSchema: z.ZodType<Prisma.StepCreateManyPlanInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserWithPermissionsCreateManyPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyPlanInput> = z.object({
  userId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionInvitationCreateManyPlanInputSchema: z.ZodType<Prisma.PermissionInvitationCreateManyPlanInput> = z.object({
  token: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  invitedBy: z.string().email({ message: 'Invalid email address' }),
  createdAt: z.coerce.date().optional(),
  hasWritePermission: z.boolean(),
  isUsed: z.boolean().optional()
}).strict();

export const StepUpdateWithoutPlanInputSchema: z.ZodType<Prisma.StepUpdateWithoutPlanInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coord: z.lazy(() => CoordUpdateOneWithoutStepNestedInputSchema).optional()
}).strict();

export const StepUncheckedUpdateWithoutPlanInputSchema: z.ZodType<Prisma.StepUncheckedUpdateWithoutPlanInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  coord: z.lazy(() => CoordUncheckedUpdateOneWithoutStepNestedInputSchema).optional()
}).strict();

export const StepUncheckedUpdateManyWithoutPlanInputSchema: z.ZodType<Prisma.StepUncheckedUpdateManyWithoutPlanInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsUpdateWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateWithoutPlanInput> = z.object({
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPlansNestedInputSchema).optional()
}).strict();

export const UserWithPermissionsUncheckedUpdateWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateWithoutPlanInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedUpdateManyWithoutPlanInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateManyWithoutPlanInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationUpdateWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUpdateWithoutPlanInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationUncheckedUpdateWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedUpdateWithoutPlanInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionInvitationUncheckedUpdateManyWithoutPlanInputSchema: z.ZodType<Prisma.PermissionInvitationUncheckedUpdateManyWithoutPlanInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  invitedBy: z.union([ z.string().email({ message: 'Invalid email address' }),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsCreateManyUserInputSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyUserInput> = z.object({
  planId: z.string(),
  hasWritePermission: z.boolean(),
  isCreator: z.boolean(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PasswordForgottenCreateManyUserInputSchema: z.ZodType<Prisma.PasswordForgottenCreateManyUserInput> = z.object({
  token: z.string(),
  createdAt: z.coerce.date().optional(),
  isUsed: z.boolean().optional()
}).strict();

export const UserWithPermissionsUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUpdateWithoutUserInput> = z.object({
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  plan: z.lazy(() => PlanUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserWithPermissionsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateWithoutUserInput> = z.object({
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserWithPermissionsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserWithPermissionsUncheckedUpdateManyWithoutUserInput> = z.object({
  planId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hasWritePermission: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  isCreator: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordForgottenUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordForgottenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedUpdateWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PasswordForgottenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordForgottenUncheckedUpdateManyWithoutUserInput> = z.object({
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  isUsed: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const CoordFindFirstArgsSchema: z.ZodType<Prisma.CoordFindFirstArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereInputSchema.optional(),
  orderBy: z.union([ CoordOrderByWithRelationInputSchema.array(),CoordOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordScalarFieldEnumSchema,CoordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CoordFindFirstOrThrowArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereInputSchema.optional(),
  orderBy: z.union([ CoordOrderByWithRelationInputSchema.array(),CoordOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordScalarFieldEnumSchema,CoordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordFindManyArgsSchema: z.ZodType<Prisma.CoordFindManyArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereInputSchema.optional(),
  orderBy: z.union([ CoordOrderByWithRelationInputSchema.array(),CoordOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CoordScalarFieldEnumSchema,CoordScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CoordAggregateArgsSchema: z.ZodType<Prisma.CoordAggregateArgs> = z.object({
  where: CoordWhereInputSchema.optional(),
  orderBy: z.union([ CoordOrderByWithRelationInputSchema.array(),CoordOrderByWithRelationInputSchema ]).optional(),
  cursor: CoordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordGroupByArgsSchema: z.ZodType<Prisma.CoordGroupByArgs> = z.object({
  where: CoordWhereInputSchema.optional(),
  orderBy: z.union([ CoordOrderByWithAggregationInputSchema.array(),CoordOrderByWithAggregationInputSchema ]).optional(),
  by: CoordScalarFieldEnumSchema.array(),
  having: CoordScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CoordFindUniqueArgsSchema: z.ZodType<Prisma.CoordFindUniqueArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereUniqueInputSchema,
}).strict() ;

export const CoordFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CoordFindUniqueOrThrowArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereUniqueInputSchema,
}).strict() ;

export const StepFindFirstArgsSchema: z.ZodType<Prisma.StepFindFirstArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereInputSchema.optional(),
  orderBy: z.union([ StepOrderByWithRelationInputSchema.array(),StepOrderByWithRelationInputSchema ]).optional(),
  cursor: StepWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StepScalarFieldEnumSchema,StepScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StepFindFirstOrThrowArgsSchema: z.ZodType<Prisma.StepFindFirstOrThrowArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereInputSchema.optional(),
  orderBy: z.union([ StepOrderByWithRelationInputSchema.array(),StepOrderByWithRelationInputSchema ]).optional(),
  cursor: StepWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StepScalarFieldEnumSchema,StepScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StepFindManyArgsSchema: z.ZodType<Prisma.StepFindManyArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereInputSchema.optional(),
  orderBy: z.union([ StepOrderByWithRelationInputSchema.array(),StepOrderByWithRelationInputSchema ]).optional(),
  cursor: StepWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StepScalarFieldEnumSchema,StepScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const StepAggregateArgsSchema: z.ZodType<Prisma.StepAggregateArgs> = z.object({
  where: StepWhereInputSchema.optional(),
  orderBy: z.union([ StepOrderByWithRelationInputSchema.array(),StepOrderByWithRelationInputSchema ]).optional(),
  cursor: StepWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StepGroupByArgsSchema: z.ZodType<Prisma.StepGroupByArgs> = z.object({
  where: StepWhereInputSchema.optional(),
  orderBy: z.union([ StepOrderByWithAggregationInputSchema.array(),StepOrderByWithAggregationInputSchema ]).optional(),
  by: StepScalarFieldEnumSchema.array(),
  having: StepScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const StepFindUniqueArgsSchema: z.ZodType<Prisma.StepFindUniqueArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereUniqueInputSchema,
}).strict() ;

export const StepFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.StepFindUniqueOrThrowArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereUniqueInputSchema,
}).strict() ;

export const PlanFindFirstArgsSchema: z.ZodType<Prisma.PlanFindFirstArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereInputSchema.optional(),
  orderBy: z.union([ PlanOrderByWithRelationInputSchema.array(),PlanOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlanScalarFieldEnumSchema,PlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlanFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlanFindFirstOrThrowArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereInputSchema.optional(),
  orderBy: z.union([ PlanOrderByWithRelationInputSchema.array(),PlanOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlanScalarFieldEnumSchema,PlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlanFindManyArgsSchema: z.ZodType<Prisma.PlanFindManyArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereInputSchema.optional(),
  orderBy: z.union([ PlanOrderByWithRelationInputSchema.array(),PlanOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlanScalarFieldEnumSchema,PlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlanAggregateArgsSchema: z.ZodType<Prisma.PlanAggregateArgs> = z.object({
  where: PlanWhereInputSchema.optional(),
  orderBy: z.union([ PlanOrderByWithRelationInputSchema.array(),PlanOrderByWithRelationInputSchema ]).optional(),
  cursor: PlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlanGroupByArgsSchema: z.ZodType<Prisma.PlanGroupByArgs> = z.object({
  where: PlanWhereInputSchema.optional(),
  orderBy: z.union([ PlanOrderByWithAggregationInputSchema.array(),PlanOrderByWithAggregationInputSchema ]).optional(),
  by: PlanScalarFieldEnumSchema.array(),
  having: PlanScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlanFindUniqueArgsSchema: z.ZodType<Prisma.PlanFindUniqueArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereUniqueInputSchema,
}).strict() ;

export const PlanFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlanFindUniqueOrThrowArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const PasswordForgottenFindFirstArgsSchema: z.ZodType<Prisma.PasswordForgottenFindFirstArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordForgottenOrderByWithRelationInputSchema.array(),PasswordForgottenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordForgottenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordForgottenScalarFieldEnumSchema,PasswordForgottenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordForgottenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordForgottenFindFirstOrThrowArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordForgottenOrderByWithRelationInputSchema.array(),PasswordForgottenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordForgottenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordForgottenScalarFieldEnumSchema,PasswordForgottenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordForgottenFindManyArgsSchema: z.ZodType<Prisma.PasswordForgottenFindManyArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordForgottenOrderByWithRelationInputSchema.array(),PasswordForgottenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordForgottenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PasswordForgottenScalarFieldEnumSchema,PasswordForgottenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PasswordForgottenAggregateArgsSchema: z.ZodType<Prisma.PasswordForgottenAggregateArgs> = z.object({
  where: PasswordForgottenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordForgottenOrderByWithRelationInputSchema.array(),PasswordForgottenOrderByWithRelationInputSchema ]).optional(),
  cursor: PasswordForgottenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasswordForgottenGroupByArgsSchema: z.ZodType<Prisma.PasswordForgottenGroupByArgs> = z.object({
  where: PasswordForgottenWhereInputSchema.optional(),
  orderBy: z.union([ PasswordForgottenOrderByWithAggregationInputSchema.array(),PasswordForgottenOrderByWithAggregationInputSchema ]).optional(),
  by: PasswordForgottenScalarFieldEnumSchema.array(),
  having: PasswordForgottenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PasswordForgottenFindUniqueArgsSchema: z.ZodType<Prisma.PasswordForgottenFindUniqueArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereUniqueInputSchema,
}).strict() ;

export const PasswordForgottenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordForgottenFindUniqueOrThrowArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereUniqueInputSchema,
}).strict() ;

export const PermissionInvitationFindFirstArgsSchema: z.ZodType<Prisma.PermissionInvitationFindFirstArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereInputSchema.optional(),
  orderBy: z.union([ PermissionInvitationOrderByWithRelationInputSchema.array(),PermissionInvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionInvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionInvitationScalarFieldEnumSchema,PermissionInvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionInvitationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionInvitationFindFirstOrThrowArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereInputSchema.optional(),
  orderBy: z.union([ PermissionInvitationOrderByWithRelationInputSchema.array(),PermissionInvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionInvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionInvitationScalarFieldEnumSchema,PermissionInvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionInvitationFindManyArgsSchema: z.ZodType<Prisma.PermissionInvitationFindManyArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereInputSchema.optional(),
  orderBy: z.union([ PermissionInvitationOrderByWithRelationInputSchema.array(),PermissionInvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionInvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionInvitationScalarFieldEnumSchema,PermissionInvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionInvitationAggregateArgsSchema: z.ZodType<Prisma.PermissionInvitationAggregateArgs> = z.object({
  where: PermissionInvitationWhereInputSchema.optional(),
  orderBy: z.union([ PermissionInvitationOrderByWithRelationInputSchema.array(),PermissionInvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionInvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionInvitationGroupByArgsSchema: z.ZodType<Prisma.PermissionInvitationGroupByArgs> = z.object({
  where: PermissionInvitationWhereInputSchema.optional(),
  orderBy: z.union([ PermissionInvitationOrderByWithAggregationInputSchema.array(),PermissionInvitationOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionInvitationScalarFieldEnumSchema.array(),
  having: PermissionInvitationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionInvitationFindUniqueArgsSchema: z.ZodType<Prisma.PermissionInvitationFindUniqueArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereUniqueInputSchema,
}).strict() ;

export const PermissionInvitationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionInvitationFindUniqueOrThrowArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereUniqueInputSchema,
}).strict() ;

export const UserWithPermissionsFindFirstArgsSchema: z.ZodType<Prisma.UserWithPermissionsFindFirstArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UserWithPermissionsOrderByWithRelationInputSchema.array(),UserWithPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWithPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserWithPermissionsScalarFieldEnumSchema,UserWithPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserWithPermissionsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserWithPermissionsFindFirstOrThrowArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UserWithPermissionsOrderByWithRelationInputSchema.array(),UserWithPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWithPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserWithPermissionsScalarFieldEnumSchema,UserWithPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserWithPermissionsFindManyArgsSchema: z.ZodType<Prisma.UserWithPermissionsFindManyArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UserWithPermissionsOrderByWithRelationInputSchema.array(),UserWithPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWithPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserWithPermissionsScalarFieldEnumSchema,UserWithPermissionsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserWithPermissionsAggregateArgsSchema: z.ZodType<Prisma.UserWithPermissionsAggregateArgs> = z.object({
  where: UserWithPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UserWithPermissionsOrderByWithRelationInputSchema.array(),UserWithPermissionsOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWithPermissionsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserWithPermissionsGroupByArgsSchema: z.ZodType<Prisma.UserWithPermissionsGroupByArgs> = z.object({
  where: UserWithPermissionsWhereInputSchema.optional(),
  orderBy: z.union([ UserWithPermissionsOrderByWithAggregationInputSchema.array(),UserWithPermissionsOrderByWithAggregationInputSchema ]).optional(),
  by: UserWithPermissionsScalarFieldEnumSchema.array(),
  having: UserWithPermissionsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserWithPermissionsFindUniqueArgsSchema: z.ZodType<Prisma.UserWithPermissionsFindUniqueArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereUniqueInputSchema,
}).strict() ;

export const UserWithPermissionsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserWithPermissionsFindUniqueOrThrowArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereUniqueInputSchema,
}).strict() ;

export const CoordCreateArgsSchema: z.ZodType<Prisma.CoordCreateArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  data: z.union([ CoordCreateInputSchema,CoordUncheckedCreateInputSchema ]),
}).strict() ;

export const CoordUpsertArgsSchema: z.ZodType<Prisma.CoordUpsertArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereUniqueInputSchema,
  create: z.union([ CoordCreateInputSchema,CoordUncheckedCreateInputSchema ]),
  update: z.union([ CoordUpdateInputSchema,CoordUncheckedUpdateInputSchema ]),
}).strict() ;

export const CoordCreateManyArgsSchema: z.ZodType<Prisma.CoordCreateManyArgs> = z.object({
  data: z.union([ CoordCreateManyInputSchema,CoordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CoordCreateManyAndReturnArgs> = z.object({
  data: z.union([ CoordCreateManyInputSchema,CoordCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CoordDeleteArgsSchema: z.ZodType<Prisma.CoordDeleteArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  where: CoordWhereUniqueInputSchema,
}).strict() ;

export const CoordUpdateArgsSchema: z.ZodType<Prisma.CoordUpdateArgs> = z.object({
  select: CoordSelectSchema.optional(),
  include: CoordIncludeSchema.optional(),
  data: z.union([ CoordUpdateInputSchema,CoordUncheckedUpdateInputSchema ]),
  where: CoordWhereUniqueInputSchema,
}).strict() ;

export const CoordUpdateManyArgsSchema: z.ZodType<Prisma.CoordUpdateManyArgs> = z.object({
  data: z.union([ CoordUpdateManyMutationInputSchema,CoordUncheckedUpdateManyInputSchema ]),
  where: CoordWhereInputSchema.optional(),
}).strict() ;

export const CoordDeleteManyArgsSchema: z.ZodType<Prisma.CoordDeleteManyArgs> = z.object({
  where: CoordWhereInputSchema.optional(),
}).strict() ;

export const StepCreateArgsSchema: z.ZodType<Prisma.StepCreateArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  data: z.union([ StepCreateInputSchema,StepUncheckedCreateInputSchema ]),
}).strict() ;

export const StepUpsertArgsSchema: z.ZodType<Prisma.StepUpsertArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereUniqueInputSchema,
  create: z.union([ StepCreateInputSchema,StepUncheckedCreateInputSchema ]),
  update: z.union([ StepUpdateInputSchema,StepUncheckedUpdateInputSchema ]),
}).strict() ;

export const StepCreateManyArgsSchema: z.ZodType<Prisma.StepCreateManyArgs> = z.object({
  data: z.union([ StepCreateManyInputSchema,StepCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StepCreateManyAndReturnArgsSchema: z.ZodType<Prisma.StepCreateManyAndReturnArgs> = z.object({
  data: z.union([ StepCreateManyInputSchema,StepCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const StepDeleteArgsSchema: z.ZodType<Prisma.StepDeleteArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  where: StepWhereUniqueInputSchema,
}).strict() ;

export const StepUpdateArgsSchema: z.ZodType<Prisma.StepUpdateArgs> = z.object({
  select: StepSelectSchema.optional(),
  include: StepIncludeSchema.optional(),
  data: z.union([ StepUpdateInputSchema,StepUncheckedUpdateInputSchema ]),
  where: StepWhereUniqueInputSchema,
}).strict() ;

export const StepUpdateManyArgsSchema: z.ZodType<Prisma.StepUpdateManyArgs> = z.object({
  data: z.union([ StepUpdateManyMutationInputSchema,StepUncheckedUpdateManyInputSchema ]),
  where: StepWhereInputSchema.optional(),
}).strict() ;

export const StepDeleteManyArgsSchema: z.ZodType<Prisma.StepDeleteManyArgs> = z.object({
  where: StepWhereInputSchema.optional(),
}).strict() ;

export const PlanCreateArgsSchema: z.ZodType<Prisma.PlanCreateArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  data: z.union([ PlanCreateInputSchema,PlanUncheckedCreateInputSchema ]),
}).strict() ;

export const PlanUpsertArgsSchema: z.ZodType<Prisma.PlanUpsertArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereUniqueInputSchema,
  create: z.union([ PlanCreateInputSchema,PlanUncheckedCreateInputSchema ]),
  update: z.union([ PlanUpdateInputSchema,PlanUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlanCreateManyArgsSchema: z.ZodType<Prisma.PlanCreateManyArgs> = z.object({
  data: z.union([ PlanCreateManyInputSchema,PlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlanCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PlanCreateManyAndReturnArgs> = z.object({
  data: z.union([ PlanCreateManyInputSchema,PlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlanDeleteArgsSchema: z.ZodType<Prisma.PlanDeleteArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  where: PlanWhereUniqueInputSchema,
}).strict() ;

export const PlanUpdateArgsSchema: z.ZodType<Prisma.PlanUpdateArgs> = z.object({
  select: PlanSelectSchema.optional(),
  include: PlanIncludeSchema.optional(),
  data: z.union([ PlanUpdateInputSchema,PlanUncheckedUpdateInputSchema ]),
  where: PlanWhereUniqueInputSchema,
}).strict() ;

export const PlanUpdateManyArgsSchema: z.ZodType<Prisma.PlanUpdateManyArgs> = z.object({
  data: z.union([ PlanUpdateManyMutationInputSchema,PlanUncheckedUpdateManyInputSchema ]),
  where: PlanWhereInputSchema.optional(),
}).strict() ;

export const PlanDeleteManyArgsSchema: z.ZodType<Prisma.PlanDeleteManyArgs> = z.object({
  where: PlanWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const PasswordForgottenCreateArgsSchema: z.ZodType<Prisma.PasswordForgottenCreateArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  data: z.union([ PasswordForgottenCreateInputSchema,PasswordForgottenUncheckedCreateInputSchema ]),
}).strict() ;

export const PasswordForgottenUpsertArgsSchema: z.ZodType<Prisma.PasswordForgottenUpsertArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereUniqueInputSchema,
  create: z.union([ PasswordForgottenCreateInputSchema,PasswordForgottenUncheckedCreateInputSchema ]),
  update: z.union([ PasswordForgottenUpdateInputSchema,PasswordForgottenUncheckedUpdateInputSchema ]),
}).strict() ;

export const PasswordForgottenCreateManyArgsSchema: z.ZodType<Prisma.PasswordForgottenCreateManyArgs> = z.object({
  data: z.union([ PasswordForgottenCreateManyInputSchema,PasswordForgottenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PasswordForgottenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PasswordForgottenCreateManyAndReturnArgs> = z.object({
  data: z.union([ PasswordForgottenCreateManyInputSchema,PasswordForgottenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PasswordForgottenDeleteArgsSchema: z.ZodType<Prisma.PasswordForgottenDeleteArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  where: PasswordForgottenWhereUniqueInputSchema,
}).strict() ;

export const PasswordForgottenUpdateArgsSchema: z.ZodType<Prisma.PasswordForgottenUpdateArgs> = z.object({
  select: PasswordForgottenSelectSchema.optional(),
  include: PasswordForgottenIncludeSchema.optional(),
  data: z.union([ PasswordForgottenUpdateInputSchema,PasswordForgottenUncheckedUpdateInputSchema ]),
  where: PasswordForgottenWhereUniqueInputSchema,
}).strict() ;

export const PasswordForgottenUpdateManyArgsSchema: z.ZodType<Prisma.PasswordForgottenUpdateManyArgs> = z.object({
  data: z.union([ PasswordForgottenUpdateManyMutationInputSchema,PasswordForgottenUncheckedUpdateManyInputSchema ]),
  where: PasswordForgottenWhereInputSchema.optional(),
}).strict() ;

export const PasswordForgottenDeleteManyArgsSchema: z.ZodType<Prisma.PasswordForgottenDeleteManyArgs> = z.object({
  where: PasswordForgottenWhereInputSchema.optional(),
}).strict() ;

export const PermissionInvitationCreateArgsSchema: z.ZodType<Prisma.PermissionInvitationCreateArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  data: z.union([ PermissionInvitationCreateInputSchema,PermissionInvitationUncheckedCreateInputSchema ]),
}).strict() ;

export const PermissionInvitationUpsertArgsSchema: z.ZodType<Prisma.PermissionInvitationUpsertArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereUniqueInputSchema,
  create: z.union([ PermissionInvitationCreateInputSchema,PermissionInvitationUncheckedCreateInputSchema ]),
  update: z.union([ PermissionInvitationUpdateInputSchema,PermissionInvitationUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermissionInvitationCreateManyArgsSchema: z.ZodType<Prisma.PermissionInvitationCreateManyArgs> = z.object({
  data: z.union([ PermissionInvitationCreateManyInputSchema,PermissionInvitationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PermissionInvitationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PermissionInvitationCreateManyAndReturnArgs> = z.object({
  data: z.union([ PermissionInvitationCreateManyInputSchema,PermissionInvitationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PermissionInvitationDeleteArgsSchema: z.ZodType<Prisma.PermissionInvitationDeleteArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  where: PermissionInvitationWhereUniqueInputSchema,
}).strict() ;

export const PermissionInvitationUpdateArgsSchema: z.ZodType<Prisma.PermissionInvitationUpdateArgs> = z.object({
  select: PermissionInvitationSelectSchema.optional(),
  include: PermissionInvitationIncludeSchema.optional(),
  data: z.union([ PermissionInvitationUpdateInputSchema,PermissionInvitationUncheckedUpdateInputSchema ]),
  where: PermissionInvitationWhereUniqueInputSchema,
}).strict() ;

export const PermissionInvitationUpdateManyArgsSchema: z.ZodType<Prisma.PermissionInvitationUpdateManyArgs> = z.object({
  data: z.union([ PermissionInvitationUpdateManyMutationInputSchema,PermissionInvitationUncheckedUpdateManyInputSchema ]),
  where: PermissionInvitationWhereInputSchema.optional(),
}).strict() ;

export const PermissionInvitationDeleteManyArgsSchema: z.ZodType<Prisma.PermissionInvitationDeleteManyArgs> = z.object({
  where: PermissionInvitationWhereInputSchema.optional(),
}).strict() ;

export const UserWithPermissionsCreateArgsSchema: z.ZodType<Prisma.UserWithPermissionsCreateArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  data: z.union([ UserWithPermissionsCreateInputSchema,UserWithPermissionsUncheckedCreateInputSchema ]),
}).strict() ;

export const UserWithPermissionsUpsertArgsSchema: z.ZodType<Prisma.UserWithPermissionsUpsertArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereUniqueInputSchema,
  create: z.union([ UserWithPermissionsCreateInputSchema,UserWithPermissionsUncheckedCreateInputSchema ]),
  update: z.union([ UserWithPermissionsUpdateInputSchema,UserWithPermissionsUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserWithPermissionsCreateManyArgsSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyArgs> = z.object({
  data: z.union([ UserWithPermissionsCreateManyInputSchema,UserWithPermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserWithPermissionsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserWithPermissionsCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserWithPermissionsCreateManyInputSchema,UserWithPermissionsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserWithPermissionsDeleteArgsSchema: z.ZodType<Prisma.UserWithPermissionsDeleteArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  where: UserWithPermissionsWhereUniqueInputSchema,
}).strict() ;

export const UserWithPermissionsUpdateArgsSchema: z.ZodType<Prisma.UserWithPermissionsUpdateArgs> = z.object({
  select: UserWithPermissionsSelectSchema.optional(),
  include: UserWithPermissionsIncludeSchema.optional(),
  data: z.union([ UserWithPermissionsUpdateInputSchema,UserWithPermissionsUncheckedUpdateInputSchema ]),
  where: UserWithPermissionsWhereUniqueInputSchema,
}).strict() ;

export const UserWithPermissionsUpdateManyArgsSchema: z.ZodType<Prisma.UserWithPermissionsUpdateManyArgs> = z.object({
  data: z.union([ UserWithPermissionsUpdateManyMutationInputSchema,UserWithPermissionsUncheckedUpdateManyInputSchema ]),
  where: UserWithPermissionsWhereInputSchema.optional(),
}).strict() ;

export const UserWithPermissionsDeleteManyArgsSchema: z.ZodType<Prisma.UserWithPermissionsDeleteManyArgs> = z.object({
  where: UserWithPermissionsWhereInputSchema.optional(),
}).strict() ;