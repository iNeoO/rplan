import { pinoLogger as logger } from 'hono-pino';
import pino from 'pino';

export default function pinoLogger() {
  return logger({
    pino: pino({
      level: 'info',
    }),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
