export type EVVPayload = {
  employeeagree: boolean;
  consumeragree: boolean;
  missedevent: string;
  reasonmissed: string | void;
  consumername: string;
  employeename: string;
  consumerpin: number;
  employeepin: number;
  misseddate: string;
  missedintime: string | void;
  missedouttime: string | void;
  dutiesOptions: string;
};
export type EmailTo = {
  email: string;
  type: string;
};

type Response = {
  body: string | null;
  status: number;
};
const validatePayload = (payload: EVVPayload) => {
  // We have a lot to validate
  const response = { isPayloadValid: true, error: null };
  return response;
};
const packageResponsePayload = (message: string | null, statusCode = 200) => ({
  body: message,
  status: statusCode,
});
const formatForDisplay = (payload) => {
  let displayText = '';
  for (const [key, val] of Object.entries(JSON.parse(payload))) {
    displayText = `${displayText} 
    ${key}: ${val}`;
  }
  return displayText;
};
const addHumanReadableKeys = (payload) => {
  const fieldsMap = {
    employeeagree: 'Employee Consent',
    consumeragree: 'Consumer Consent',
    missedevent: 'Missed Event',
    reasonmissed: 'Other Reason',
    consumername: 'Consumer Name',
    employeename: 'Employee Name',
    employeepin: 'Employee PIN',
    consumerpin: 'Consumer PIN',
    employeesignature: 'Employee Signature',
    consumersignature: 'Consumer Signature',
    dutiesOptions: 'Duties Performed',
    misseddate: 'Missed Date',
    missedintime: 'Missed In Time',
    missedouttime: 'Missed Out Time',
  };
  const updatedPayload = {};
  for (const [key, val] of Object.entries(payload)) {
    updatedPayload[fieldsMap[key]] = val;
  }
  return updatedPayload;
};
export {
  validatePayload,
  packageResponsePayload,
  addHumanReadableKeys,
  formatForDisplay,
};
