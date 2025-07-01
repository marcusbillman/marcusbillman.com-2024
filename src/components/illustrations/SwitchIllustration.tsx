import type { IllustrationProps } from './index';

export default function SwitchIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="47"
      height="24"
      viewBox="0 0 47 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.6054 18H9C5.68629 18 3 15.3137 3 12C3 8.68629 5.68629 6 9 6H24.6054C25.2586 4.87078 26.0905 3.85789 27.0625 3H9C4.02944 3 0 7.02944 0 12C0 16.9706 4.02944 21 9 21H27.0625C26.0905 20.1421 25.2586 19.1292 24.6054 18Z"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="24.5"
        y="1.5"
        width="21"
        height="21"
        rx="10.5"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  ) : (
    <svg
      width="47"
      height="24"
      viewBox="0 0 47 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect y="3" width="36" height="18" rx="9" fill="var(--bg-default)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.6054 18H9C5.68629 18 3 15.3137 3 12C3 8.68629 5.68629 6 9 6H24.6054C25.2586 4.87078 26.0905 3.85789 27.0625 3H9C4.02944 3 0 7.02944 0 12C0 16.9706 4.02944 21 9 21H27.0625C26.0905 20.1421 25.2586 19.1292 24.6054 18Z"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="24.5"
        y="1.5"
        width="21"
        height="21"
        rx="10.5"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  );
}
