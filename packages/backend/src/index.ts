import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';
import { createInternalApp } from './libs/honoCreateApp.ts';

// import MailService from './services/mailService';

import authRoutes from './routes/auth.route.ts';
import userRoutes from './routes/user.route.ts';
import planRoutes from './routes/plan.route.ts';
import invitationRoutes from './routes/invitation.route.ts';

const app = createInternalApp();

app.route('auth', authRoutes);
app.route('user', userRoutes);
app.route('plan', planRoutes);
app.route('invitation', invitationRoutes);

app.get(
  '/ui',
  swaggerUI({
    url: '/doc',
  }),
);

app.doc('/doc', {
  info: {
    title: 'An API',
    version: 'v1',
  },
  openapi: '3.1.0',
});

app.get('/*', c => c.json({ welcome: 'to rplan' }));

const port = 4000;

serve({
  fetch: app.fetch,
  port,
});
