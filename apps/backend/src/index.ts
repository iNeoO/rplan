import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';
import { createInternalApp } from './libs/honoCreateApp.ts';

// import MailService from './services/mailService';

import authRoutes from './routes/auth.route.ts';
import invitationRoutes from './routes/invitation.route.ts';
import planRoutes from './routes/plan.route.ts';
import userRoutes from './routes/user.route.ts';

const app = createInternalApp();

app.route('/', authRoutes);
app.route('/', userRoutes);
app.route('/', planRoutes);
app.route('/', invitationRoutes);

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

app.get('/*', (c) => c.json({ welcome: 'to rplan' }));

const port = 4000;

serve({
  fetch: app.fetch,
  port,
});
