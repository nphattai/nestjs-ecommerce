export function isValidJSONString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

export function safeJSONParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
