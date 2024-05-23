import { FastifyJWT } from '@fastify/jwt';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { AuthError } from '../utils';

export const verify_JWT_and_attach_user = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { authorization } = request.headers;

    if (authorization) {
      const token = authorization.split('Bearer ')[1];

      if (token) {
        const decoded = request.jwt.verify<FastifyJWT['user']>(token);

        request.user = decoded;
      }
    }
  } catch (error) {
    throw new AuthError(error as string);
  }
};
