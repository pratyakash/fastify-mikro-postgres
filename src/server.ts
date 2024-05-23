import 'dotenv/config';

import server from './app';

const start = async () => {
  try {
    await server.ready();
    await server.listen({ port: 3000 });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
