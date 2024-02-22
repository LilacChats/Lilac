import { REGEX_STRINGS } from './objs';
import { InputBoxTypes } from './types';

function validateName(name: string): boolean {
  if (REGEX_STRINGS.NAME.test(name)) return true;
  else return false;
}

function validateEmail(email: string): boolean {
  if (REGEX_STRINGS.EMAIL.test(email)) return true;
  else return false;
}

function validateServerURL(url: string): boolean {
  if (REGEX_STRINGS.SERVER_URL.test(url)) return true;
  else return false;
}

export { validateName, validateEmail, validateServerURL };
