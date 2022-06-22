import 'https://deno.land/x/dotenv/load.ts';

import mailchimpMailchimpTransactional from 'https://cdn.skypack.dev/@mailchimp/mailchimp_transactional';
const { SEND_EMAIL, MAILCHIMP_API_KEY, RECV_EMAIL } = Deno.env.toObject();
import type { EVVPayload } from '../../utils/mod.ts';

const sendEmail = async (subject: string, emailText: EVVPayload) => {
  try {
    const mailchimp = mailchimpMailchimpTransactional(MAILCHIMP_API_KEY);
    const message = {
      from_email: SEND_EMAIL,
      subject,
      text: JSON.stringify(emailText),
      to: [
        {
          email: RECV_EMAIL,
          type: 'to',
        },
      ],
    };
    console.log({ message });
    await mailchimp.messages.send({
      message,
    });
    return { error: null, message: 'Email sent successfully!' };
  } catch (err) {
    return { error: err.message };
  }
};
export { sendEmail };
