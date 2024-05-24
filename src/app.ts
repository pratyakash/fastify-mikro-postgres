import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastify_JWT from '@fastify/jwt';
import cors from '@fastify/cors';

import routes_v1 from './routes/v1';
import { init_ORM } from './db';

import { ENV_VARS } from './config';
import { AuthError } from './utils';
import { ALLOWED_ORIGINS } from './utils/constants';

import type { Services } from './db';

const server = fastify({
  logger: process.env.NODE_ENV === 'development',
});

let db: Services;

async function main() {
  db = await init_ORM();

  await db.orm.migrator.up();

  await server.register(cors, {
    origin: (origin = '', cb) => {
      const { hostname } = new URL(origin);

      if (ALLOWED_ORIGINS.includes(hostname)) {
        cb(null, true);
        return;
      }
      cb(new Error('Not allowed'), false);
    },
    credentials: true,
  });

  server.register(fastify_JWT, {
    secret: ENV_VARS.JWT_SECRET,
  });

  server.addHook(
    'onRequest',
    (request: FastifyRequest, reply: FastifyReply, done) => {
      request.jwt = server.jwt;
      return done();
    }
  );

  server.register(routes_v1, { prefix: '/api/v1' });

  server.setErrorHandler((error, request, reply) => {
    const code = error instanceof AuthError ? 401 : error.statusCode || 500;

    reply.code(code).send({
      code,
      success: false,
      sent_at: new Date().toISOString(),
      message: error.message,
      data: null,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  });

  server.addHook('onClose', async () => {
    await db.orm.close();
  });
}

export { server, main };
