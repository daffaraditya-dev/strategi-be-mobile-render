interface ErrorResponse {
  success: boolean;
  message: string | string[];
  statusCode: number;
}

export const createErrorResponse = (
  message: string | string[],
  statusCode: number = 400
): ErrorResponse => {
  return {
    success: false,
    message: message,
    statusCode,
  };
};
