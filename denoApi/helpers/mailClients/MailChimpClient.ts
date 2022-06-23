import mailchimpMailchimpTransactional from 'https://cdn.skypack.dev/@mailchimp/mailchimp_transactional';
import type { EVVPayload, EmailTo } from '../../utils/mod.ts';

const sendEmail = async (
  subject: string,
  emailText: EVVPayload,
  to: EmailTo[],
  from: string,
  apiKey: string,
) => {
  try {
    const mailchimp = mailchimpMailchimpTransactional(apiKey);
    const message = {
      from_email: from,
      subject,
      text: JSON.stringify(emailText),
      to,
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
