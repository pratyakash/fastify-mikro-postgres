import { FastifyInstance } from 'fastify';

import user_router from './user_router';

const v1_routes = [
  {
    path: '/users',
    router: user_router
  }
];

const api_v1_routes = async (fastify: FastifyInstance) => {
  v1_routes.forEach(route => {
    fastify.register(route.router, { prefix: route.path });
  });
};

export default api_v1_routes;
