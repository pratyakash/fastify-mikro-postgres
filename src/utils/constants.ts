export const global_schema = {
  schema: {
    response: {
      type: 'object',
      properties: {
        code: { type: ['number', 'string'] },
        success: { type: 'boolean', nullable: true },
        sent_at: { type: ['string', 'null'], format: 'date-time' },
        message: { type: 'string', nullable: true },
        data: { type: 'array', items: {} },
        error: { type: ['object', 'null'], nullable: true } // Assuming Error will be an object or null
      },
      required: ['code', 'success', 'message']
    }
  }
};

export const ALLOWED_ORIGINS = ['localhost'];
