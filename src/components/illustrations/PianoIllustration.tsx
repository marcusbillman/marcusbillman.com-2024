import type { IllustrationProps } from './index';

export default function PianoIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="163"
      height="92"
      viewBox="0 0 163 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M23 52.5H26V91.5H23V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M46 52.5H49V91.5H46V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M91 52.5H94V91.5H91V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path d="M69 0.5H72V91.5H69V0.5Z" fill="var(--illustration-secondary)" />
      <path
        d="M114 52.5H117V91.5H114V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M137 52.5H140V91.5H137V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M17.4248 2H31.4874V51.1001C31.4874 52.4809 30.3681 53.6001 28.9874 53.6001H19.9248C18.5441 53.6001 17.4248 52.4809 17.4248 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M40.1748 2H54.2374V51.1001C54.2374 52.4809 53.1181 53.6001 51.7374 53.6001H42.6748C41.2941 53.6001 40.1748 52.4809 40.1748 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M85.6753 2H99.7378V51.1001C99.7378 52.4809 98.6185 53.6001 97.2378 53.6001H88.1753C86.7946 53.6001 85.6753 52.4809 85.6753 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M108.425 2H122.488V51.1001C122.488 52.4809 121.369 53.6001 119.988 53.6001H110.925C109.545 53.6001 108.425 52.4809 108.425 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M131.175 2H145.238V51.1001C145.238 52.4809 144.119 53.6001 142.738 53.6001H133.675C132.295 53.6001 131.175 52.4809 131.175 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <rect
        x="1.5"
        y="2"
        width="159.663"
        height="88.0002"
        rx="2.5"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  ) : (
    <svg
      width="164"
      height="92"
      viewBox="0 0 164 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="162.663"
        height="91.0002"
        transform="translate(0.662933 0.5)"
        fill="var(--bg-default)"
      />
      <path
        d="M23.6629 52.5H26.6629V91.5H23.6629V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M46.6629 52.5H49.6629V91.5H46.6629V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M91.6629 52.5H94.6629V91.5H91.6629V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M69.6629 0.5H72.6629V91.5H69.6629V0.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M114.663 52.5H117.663V91.5H114.663V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M137.663 52.5H140.663V91.5H137.663V52.5Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M18.0877 2H32.1503V51.1001C32.1503 52.4809 31.031 53.6001 29.6503 53.6001H20.5877C19.207 53.6001 18.0877 52.4809 18.0877 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M40.8377 2H54.9003V51.1001C54.9003 52.4809 53.781 53.6001 52.4003 53.6001H43.3377C41.957 53.6001 40.8377 52.4809 40.8377 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M86.3382 2H100.401V51.1001C100.401 52.4809 99.2815 53.6001 97.9008 53.6001H88.8382C87.4575 53.6001 86.3382 52.4809 86.3382 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M109.088 2H123.151V51.1001C123.151 52.4809 122.031 53.6001 120.651 53.6001H111.588C110.208 53.6001 109.088 52.4809 109.088 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M131.838 2H145.901V51.1001C145.901 52.4809 144.781 53.6001 143.401 53.6001H134.338C132.958 53.6001 131.838 52.4809 131.838 51.1001V2Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <rect
        x="2.16293"
        y="2"
        width="159.663"
        height="88.0002"
        rx="2.5"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  );
}
