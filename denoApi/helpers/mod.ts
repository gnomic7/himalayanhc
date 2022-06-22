import { sendEmail as sendEmailWithMailChimp } from './mailClients/MailChimpClient.ts';
import type { EVVPayload } from '../utils/mod.ts';
const sendEmail = async ({
  employeename,
  misseddate,
  missedevent,
  ...otherPayload
}: EVVPayload) => {
  try {
    const subject = `${misseddate}: ${employeename} ${missedevent}`;
    return sendEmailWithMailChimp(subject, {
      employeename,
      misseddate,
      missedevent,
      ...otherPayload,
    });
  } catch (err) {
    return { error: err.message };
  }
};

export { sendEmail };
