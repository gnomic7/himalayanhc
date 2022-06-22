import 'https://deno.land/x/dotenv/load.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

import router from './routes/mod.ts';

const DENO_PORT = Deno.env.get('DENO_PORT');
try {
  const port = DENO_PORT ? +DENO_PORT : 8000;
  const app = new Application();
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.addEventListener('listen', ({ hostname, port, secure }) =>
    console.log(`
  Listening on ${secure ? 'https://' : 'http://'}${
      hostname ?? 'localhost'
    }:${port}`),
  );
  app.listen({ port });
} catch (error) {
  console.log(error);
}
