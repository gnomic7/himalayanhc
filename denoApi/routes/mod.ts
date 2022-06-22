import { Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import { sendEmail } from '../helpers/mod.ts';
import { validatePayload, packageResponsePayload } from '../utils/mod.ts';

const router = new Router();
router.post(
  '/hhc',
  oakCors({ origin: ['https://himalayanhc.github.io/'] }),
  async (context) => {
    let resp;
    try {
      const payloadStringified = await context.request.body().value;
      const payload = JSON.parse(payloadStringified);
      const { error, isPayloadValid } = validatePayload(payload);
      if (isPayloadValid) {
        const { error: err, message } = await sendEmail(payload);
        if (err) throw new Error(err);
        resp = packageResponsePayload(message || 'success', 200);
      } else {
        resp = packageResponsePayload(error, 422);
      }
    } catch (allError) {
      resp = packageResponsePayload(allError.message, 500);
    }
    context.response.body = resp.body;
    context.response.status = resp.status;
  },
);
router.get('/', (context) => {
  context.response.body = 'Muhaaaaaaaaa!';
});
export default router;
