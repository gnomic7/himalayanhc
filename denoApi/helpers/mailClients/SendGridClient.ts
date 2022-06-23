// import sendgridMail from 'https://cdn.skypack.dev/@sendgrid/mail';
import type { EVVPayload, EmailTo } from '../../utils/mod.ts';

const sendEmail = async (
  subject: string,
  emailText: EVVPayload,
  to: EmailTo[],
  from: string,
  apiKey: string,
) => {
  try {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    const [{ email: toEmail }] = to;
    const emailPayload = {
      from: { email: from, name: 'Himalayan Health Care - EVV' },
      personalizations: [
        {
          subject,
          to: [{ name: 'Himalayan EVV', email: toEmail }],
        },
      ],
      content: [
        { type: 'text/plain', value: JSON.stringify(emailText) },
        { type: 'text/html', value: `<pre>${JSON.stringify(emailText)}</pre>` },
      ],
    };

    await fetch(url, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
export { sendEmail };
