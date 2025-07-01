import type { IllustrationProps } from './index';

export default function AudioFileIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="50"
      height="70"
      viewBox="0 0 50 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48.5 12.6569V66C48.5 67.3807 47.3807 68.5 46 68.5H4C2.61929 68.5 1.5 67.3807 1.5 66V4C1.5 2.61929 2.61929 1.5 4 1.5H37.3431C38.0062 1.5 38.6421 1.76339 39.1109 2.23223L47.7678 10.8891C48.2366 11.3579 48.5 11.9938 48.5 12.6569Z"
        stroke="var(--color-primary)"
        strokeWidth="3"
      />
      <path
        d="M14.5337 59H16.022L16.7368 54.3945L16.8013 53.9609L16.8657 54.3945L17.6098 59H19.0981L20.2817 50.4688H18.77L18.1899 55.25L18.1489 55.6074L18.0962 55.2559L17.3813 50.4688H16.2036L15.5298 55.2207L15.477 55.5723L15.436 55.2383L14.8677 50.4688H13.3618L14.5337 59ZM25.8594 57.2188L26.3574 59H28.0918L25.3496 50.4688H23.8555L21.0605 59H22.7949L23.2988 57.2188H25.8594ZM23.7031 55.8184L24.5996 52.6777L25.4727 55.8184H23.7031ZM31.3433 59H33.0191L35.603 50.4688H33.7866L32.3335 56.0352L32.1753 56.6152L32.0288 56.041L30.5816 50.4688H28.7652L31.3433 59Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M38 3V12H47"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <circle
        cx="16.8824"
        cy="39.5884"
        r="3.88235"
        fill="var(--illustration-secondary)"
      />
      <circle
        cx="31.1177"
        cy="37"
        r="3.88235"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M20.765 25.3529V39.5882H18.1768V18.8824L35.0003 15V37H32.4121V22.7647L20.765 25.3529Z"
        fill="var(--illustration-secondary)"
      />
    </svg>
  ) : (
    <svg
      width="50"
      height="70"
      viewBox="0 0 50 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48.5 12.6569V66C48.5 67.3807 47.3807 68.5 46 68.5H4C2.61929 68.5 1.5 67.3807 1.5 66V4C1.5 2.61929 2.61929 1.5 4 1.5H37.3431C38.0062 1.5 38.6421 1.76339 39.1109 2.23223L47.7678 10.8891C48.2366 11.3579 48.5 11.9938 48.5 12.6569Z"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M14.5337 59H16.022L16.7368 54.3945L16.8013 53.9609L16.8657 54.3945L17.6098 59H19.0981L20.2817 50.4688H18.77L18.1899 55.25L18.1489 55.6074L18.0962 55.2559L17.3813 50.4688H16.2036L15.5298 55.2207L15.477 55.5723L15.436 55.2383L14.8677 50.4688H13.3618L14.5337 59ZM25.8594 57.2188L26.3574 59H28.0918L25.3496 50.4688H23.8555L21.0605 59H22.7949L23.2988 57.2188H25.8594ZM23.7031 55.8184L24.5996 52.6777L25.4727 55.8184H23.7031ZM31.3433 59H33.0191L35.603 50.4688H33.7866L32.3335 56.0352L32.1753 56.6152L32.0288 56.041L30.5816 50.4688H28.7652L31.3433 59Z"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M38 3V12H47"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <circle
        cx="16.8824"
        cy="39.5884"
        r="3.88235"
        fill="var(--illustration-secondary)"
      />
      <circle
        cx="31.1177"
        cy="37"
        r="3.88235"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M20.765 25.3529V39.5882H18.1768V18.8824L35.0003 15V37H32.4121V22.7647L20.765 25.3529Z"
        fill="var(--illustration-secondary)"
      />
    </svg>
  );
}
