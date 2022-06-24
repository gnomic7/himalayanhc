// import sendgridMail from 'https://cdn.skypack.dev/@sendgrid/mail';
import {
  addHumanReadableKeys,
  formatForDisplay,
  type EVVPayload,
  type EmailTo,
} from '../../utils/mod.ts';

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
    const humanReadablePayload = addHumanReadableKeys({
      ...emailText,
      employeesignature: emailText.employeename,
      consumersignature: emailText.consumername,
    });
    const emailTextString = JSON.stringify(humanReadablePayload);

    const emailPayload = {
      from: { email: from, name: 'Himalayan Health Care - EVV' },
      personalizations: [
        {
          subject,
          to: [{ name: 'Himalayan EVV', email: toEmail }],
        },
      ],
      content: [
        {
          type: 'text/plain',
          value: formatForDisplay(emailTextString),
        },
        {
          type: 'text/html',
          value: `<pre>${formatForDisplay(emailTextString)}</pre>`,
        },
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
    console.log('Email Sent Successfully');
    return { error: null, message: 'Email sent successfully!' };
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
export { sendEmail };
