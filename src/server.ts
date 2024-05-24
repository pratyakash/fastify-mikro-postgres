import 'dotenv/config';

import { server, main } from './app';

const start = async () => {
  try {
    const PORT = Number(process.env.PORT) ?? 3000;

    await main();
    await server.ready();
    await server.listen({ port: PORT });
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
