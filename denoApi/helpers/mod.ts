import { sendEmail as sendEmailWithMailChimp } from './mailClients/MailChimpClient.ts';
import { sendEmail as sendEmailWithSendGrid } from './mailClients/SendGridClient.ts';

import type { EVVPayload } from '../utils/mod.ts';
const sendEmail = async (
  { employeename, misseddate, missedevent, ...otherPayload }: EVVPayload,
  emailClient: string,
  to,
  from,
  apiKey: string,
) => {
  try {
    const subject = `${misseddate}: ${employeename} ${missedevent}`;
    if (emailClient === 'sendGrid') {
      return sendEmailWithSendGrid(
        subject,
        {
          employeename,
          misseddate,
          missedevent,
          ...otherPayload,
        },
        to,
        from,
        apiKey,
      );
    }
    return sendEmailWithMailChimp(
      subject,
      {
        employeename,
        misseddate,
        missedevent,
        ...otherPayload,
      },
      to,
      from,
      apiKey,
    );
  } catch (err) {
    return { error: err.message };
  }
};

export { sendEmail };
