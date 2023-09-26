/* eslint-disable import/prefer-default-export */
export const errorResponse = (
  errorCode: string,
  message: string,
  details: string,
  status?: number
) => ({
  success: false,
  status: status || 500,
  message,
  error: {
    code: errorCode,
    details,
  },
});
