import 'https://deno.land/x/dotenv/load.ts';

import { Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import { sendEmail } from '../helpers/mod.ts';
import { validatePayload, packageResponsePayload } from '../utils/mod.ts';
const {
  EMAIL_CLIENT,
  SEND_EMAIL,
  MAILCHIMP_API_KEY,
  SENDGRID_API_KEY,
  RECV_EMAIL,
  ALLOW_LIST_HOST,
} = Deno.env.toObject();
const router = new Router();

const corsOptionsDelegate: CorsOptionsDelegate<Request> = async (request) => {
  const isOriginAllowed = [ALLOW_LIST_HOST].includes(
    request.headers.get('origin') ?? '',
  );
  return { origin: isOriginAllowed }; //  Reflect (enable) the requested origin in the CORS response if isOriginAllowed is true
};

router.post('/hhc', oakCors(), async (context) => {
  let resp;
  const emailClientApiKeys = {
    sendGrid: SENDGRID_API_KEY,
    mailChimp: MAILCHIMP_API_KEY,
  };
  const emailClient = EMAIL_CLIENT || 'sendGrid';
  try {
    const payloadStringified = await context.request.body().value;
    const payload = JSON.parse(payloadStringified);
    const { error, isPayloadValid } = validatePayload(payload);
    if (isPayloadValid) {
      const { error: err, message } = await sendEmail(
        payload,
        emailClient,
        [{ email: RECV_EMAIL, type: 'to' }],
        SEND_EMAIL,
        emailClientApiKeys[emailClient],
      );
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
});
router.get('/', (context) => {
  context.response.body = 'Muhaaaaaaaaa!';
});
export default router;
