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
export { validatePayload, packageResponsePayload };
