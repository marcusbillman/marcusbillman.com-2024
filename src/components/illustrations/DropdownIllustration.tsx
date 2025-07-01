import type { IllustrationProps } from './index';

export default function DropdownIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="141"
      height="66"
      viewBox="0 0 141 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.73761"
        y="1.5"
        width="137"
        height="63"
        rx="2.5"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M127.238 19L121.238 13L115.238 19"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <rect
        x="16.2376"
        y="33"
        width="60"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.23761 44H137.238V63H3.23761V44ZM16.2376 52H52.2376V55H16.2376V52ZM71.2376 52H56.2376V55H71.2376V52Z"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="16.2376"
        y="14"
        width="50"
        height="3"
        fill="var(--illustration-secondary)"
      />
    </svg>
  ) : (
    <svg
      width="141"
      height="66"
      viewBox="0 0 141 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="1.73761"
        y="1.5"
        width="137"
        height="63"
        rx="2.5"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M127.238 19L121.238 13L115.238 19"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <rect
        x="16.2376"
        y="33"
        width="60"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.23761 44H137.238V63H3.23761V44ZM16.2376 52H52.2376V55H16.2376V52ZM71.2376 52H56.2376V55H71.2376V52Z"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="16.2376"
        y="14"
        width="50"
        height="3"
        fill="var(--illustration-secondary)"
      />
    </svg>
  );
}
