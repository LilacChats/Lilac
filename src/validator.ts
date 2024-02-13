import { REGEX_STRINGS } from './objs.ts';

function validateName(name): boolean {
  if (REGEX_STRINGS.NAME.test(name)) return true;
  else return false;
}

function validateEmail(email): boolean {
  if (REGEX_STRINGS.EMAIL.test(email)) return true;
  else return false;
}

function validateServerURL(url): boolean {
  if (REGEX_STRINGS.SERVER_URL.test(url)) return true;
  else return false;
}

export { validateName, validateEmail, validateServerURL };
