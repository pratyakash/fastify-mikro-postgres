import { FastifyRequest, FastifyReply } from 'fastify';
import { send_reply } from '../utils/response.helper';
import { init_ORM } from '../db';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const db = await init_ORM();

  const dummy_user = {
    email: 'pratyakash13@gmail.com',
    first_name: 'Pratyakash',
    last_name: 'Saini',
    id: 'dev_usr_1',
  };

  db.user.create(dummy_user);

  await db.em.flush();

  const token = request.jwt.sign(dummy_user);

  send_reply(reply, [
    {
      token,
    },
  ]);
};
