import { UserData } from './Types';

const getCookie = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(name + '='))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : undefined;
};

const getUserCookie = (): UserData | null => {
  const value = getCookie('user');
  if (!value) return null;
  try {
    return JSON.parse(value) as UserData;
  } catch (error) {
    console.error('Failed to parse user cookie', error);
    return null;
  }
};

export { getCookie, getUserCookie };
