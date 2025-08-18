export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
};

export const handleApiError = (error: unknown, operation: string): never => {
  const message = getErrorMessage(error, `Erro ao ${operation}`);
  throw new Error(message);
};
