import dayjs from 'dayjs';

const getCookie = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

const setCookie = (name: string, value: string, hours: number = 24): void => {
  const expires = dayjs().add(hours, 'hour').toDate().toUTCString();
  document.cookie =
    `${name}=${encodeURIComponent(value)};` + `expires=${expires};` + 'path=/;' + 'secure;' + 'SameSite=Strict;';
};

const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

export { getCookie, setCookie, deleteCookie };
