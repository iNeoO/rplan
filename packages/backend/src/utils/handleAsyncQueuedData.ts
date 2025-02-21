import type { PinoLogger } from 'hono-pino';

export const handleAsyncQueuedData = async (promise: Promise<unknown>[], pino: PinoLogger) => {
  try {
    await Promise.all(promise);
  } catch (error) {
    pino.error(error);
  }
};