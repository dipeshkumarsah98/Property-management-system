/* eslint-disable import/prefer-default-export */
export const successResponse = (status: number, type: string, data: any) => {
  return { status, success: true, type, payload: { data, status } };
};
