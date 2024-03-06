import { FC } from 'react';
import styles from './icon.module.scss';

interface IconProps {
  type: 'success' | 'warning' | 'danger' | 'logo' | null;
}

const Success = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={styles.successIcon}
    >
      <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
};

const Warning = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={styles.warningIcon}
    >
      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
};

const Danger = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={styles.dangerIcon}
    >
      <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
};

const Logo = () => {
  return (
    <svg width="inherit" height="inherit" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_13_72)">
        <rect width="63" height="15" transform="translate(8 47)" fill="url(#paint0_linear_13_72)" />
        <ellipse cx="40.5" cy="65.5" rx="29.5" ry="6.5" fill="url(#paint1_linear_13_72)" />
        <path
          d="M71 48.912C69.9991 48.8219 69.0125 48.4711 68.123 47.9869C66.9238 47.3255 65.577 46.9341 64.1553 46.9341C62.7441 46.9341 61.3914 47.3246 60.2061 47.9867C59.1671 48.544 58.024 48.8688 56.8348 48.8688C55.6486 48.8688 54.502 48.544 53.4597 47.9863C52.2695 47.325 50.923 46.9341 49.5112 46.9341C48.0899 46.9341 46.7432 47.3253 45.5468 47.9868C44.5217 48.5432 43.3662 48.8688 42.1818 48.8688C40.994 48.8688 39.8387 48.5431 38.8137 47.9868C37.6176 47.3255 36.2709 46.9341 34.8585 46.9341C33.4385 46.9341 32.0853 47.3246 30.8997 47.9871C29.8676 48.5438 28.7185 48.8688 27.5352 48.8688C26.3431 48.8688 25.1967 48.544 24.1548 47.9866C22.9694 47.3246 21.6168 46.9341 20.2057 46.9341C18.7942 46.9341 17.4385 47.3249 16.2475 47.9868C15.2152 48.5437 14.0659 48.8688 12.8825 48.8688H12.8824C11.93 48.8689 10.6747 48.4669 9.65465 47.8342C9.14884 47.5205 8.7243 47.1641 8.43139 46.798C8.25042 46.5718 8.12893 46.3539 8.06217 46.1485C17.5848 43.5969 23.3004 36.8093 25.7908 33.8518C25.9119 33.708 26.0253 33.5733 26.1312 33.4486C31.2524 27.4155 34.4171 25.15 38.5 25.15C40.7753 25.15 42.7288 26.1506 44.0947 27.574C45.2208 28.7474 45.9244 30.1826 46.0931 31.542C44.8722 30.9898 43.4316 31.0806 42.1831 31.6824C40.6213 32.4352 39.3219 33.9973 39.0052 36.1835C38.301 41.0456 41.6273 44.614 45.8115 44.614C50.9062 44.614 53.4865 40.9781 54.6127 39.1949C57.8967 33.9957 60.6869 32.3504 63.0236 32.3275C65.5332 32.3029 67.5005 34.2871 67.7389 36.5008C67.2705 36.3274 66.8185 36.2577 66.3898 36.2869C65.7274 36.332 65.1622 36.6107 64.7195 37.032C63.8494 37.86 63.4591 39.2225 63.5856 40.5309C63.7754 42.4965 65.0958 43.7536 66.5427 44.6105L66.5527 44.6164L66.5629 44.6218C67.0441 44.8776 67.5049 45.0524 67.9143 45.1982C67.9986 45.2282 68.0796 45.2566 68.1575 45.284C68.4695 45.3935 68.733 45.486 68.9713 45.5967C70.7241 46.4111 71 48.0777 71 48.6722V48.912Z"
          fill="url(#paint2_linear_13_72)"
          stroke="url(#paint3_linear_13_72)"
        />
        <circle cx="40" cy="40" r="36" stroke="#DFDAFF" strokeWidth="8" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_13_72" x1="31.5" y1="0" x2="31.5" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22055A" />
          <stop offset="1" stopColor="#120249" />
        </linearGradient>
        <linearGradient id="paint1_linear_13_72" x1="40.5" y1="59" x2="40.5" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#120249" />
          <stop offset="1" stopColor="#00010D" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_13_72"
          x1="39.5"
          y1="24.65"
          x2="39.5"
          y2="49.4348"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#9D5AD7" />
          <stop offset="0.525" stopColor="#430794" />
          <stop offset="1" stopColor="#22055A" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_13_72"
          x1="39.5"
          y1="24.65"
          x2="39.5"
          y2="49.4348"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9D5AD7" />
          <stop offset="0.5" stopColor="#430794" />
          <stop offset="1" stopColor="#22055A" />
        </linearGradient>
        <clipPath id="clip0_13_72">
          <rect width="80" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Icon: FC<IconProps> = (props) => {
  const { type } = props;
  switch (type) {
    case 'success':
      return <Success />;
    case 'warning':
      return <Warning />;
    case 'danger':
      return <Danger />;
    case 'logo':
      return <Logo />;
    default:
      return null;
  }
};

export { Icon, IconProps };
