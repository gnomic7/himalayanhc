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
const validatePayload = (payload: EVVPayload) => {
  // We have a lot to validate
  const response = { isPayloadValid: true, error: null };
  return response;
};
const packageResponsePayload = (ctx, message, statusCode = 200) => {
  ctx.response.body = message;
  ctx.response.status = statusCode;
};
export { validatePayload, packageResponsePayload };
