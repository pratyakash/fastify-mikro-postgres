import { FastifyInstance } from 'fastify';

import { register } from '../../controller/user_controller';

import { verify_JWT_and_attach_user } from '../../middleware/verify_jwt';

const user_router = async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (request, reply) => {
    await verify_JWT_and_attach_user(request, reply);
  });

  fastify.post('/register', async (request, reply) => {
    await register(request, reply);
  });
};

export default user_router;
