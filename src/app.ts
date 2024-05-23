import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastify_JWT from '@fastify/jwt';
import cors from '@fastify/cors';

import routes_v1 from './routes/v1';

import { ENV_VARS } from './config';
import { AuthError } from './utils';
import { ALLOWED_ORIGINS } from './utils/constants';

const server = fastify({
  logger: process.env.NODE_ENV === 'development'
});

async function main() {
  await server.register(cors, {
    origin: (origin = '', cb) => {
      const hostname = new URL(origin).hostname;

      if (ALLOWED_ORIGINS.includes(hostname)) {
        cb(null, true);
        return;
      }
      cb(new Error('Not allowed'), false);
    },
    credentials: true
  });
}

main();

server.register(fastify_JWT, {
  secret: ENV_VARS.JWT_SECRET
});

server.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, done) => {
  request.jwt = server.jwt;

  return done();
});

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
      stack: error.stack
    }
  });
});

export default server;
