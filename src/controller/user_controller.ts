import { FastifyRequest, FastifyReply } from 'fastify';
import { send_reply } from '../utils/response.helper';

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.jwt.sign({
    id: 1,
    email: 'pratyakash13@gmail.com',
    name: 'Pratyakash Saini'
  });

  send_reply(reply, [
    {
      token
    }
  ]);
};
