import { pinoLogger as logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

export default function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: 'info',
      },
      pretty(),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
