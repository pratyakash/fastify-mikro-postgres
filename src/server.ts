import 'dotenv/config';

import { server, main } from './app';

const start = async () => {
  try {
    await main();
    await server.ready();
    await server.listen({ port: 3000 });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
