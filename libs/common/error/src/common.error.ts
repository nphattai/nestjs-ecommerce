export enum CommonError {
  INTERNAL_ERROR = 'INTERNAL_ERROR',

  // Dynamic Config
  CONFIG_NOT_FOUND = 'CONFIG_NOT_FOUND',
}

export const CommonErrorCodes = new Set(Object.values(CommonError));
