import { FastifyReply } from 'fastify';
import { global_schema } from './constants';

export const send_reply = (reply: FastifyReply, data: any[], isSuccess = true) => {
  const serializeInput = reply.serializeInput(
    {
      data,
      code: 200,
      message: true,
      success: isSuccess
    },
    global_schema.schema.response
  );

  reply.send(serializeInput);
};
