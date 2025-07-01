import type { IllustrationProps } from './index';

export default function MetronomeIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="63"
      height="72"
      viewBox="0 0 63 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.6426 18.75V63.1071"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M19.25 53.25H34.0357"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M20.4824 42.1606H32.8039"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M21.7144 31.0713H31.5715"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M22.9463 19.9824H30.3391"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M26.3812 63.5L51.3812 32.5"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <circle
        cx="54.9822"
        cy="28.6072"
        r="5.89286"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M2 70.5003C6.92857 67.6253 15.5536 63.1074 26.6429 63.1074C37.7321 63.1074 46.3571 67.6253 51.2857 70.5003"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M42.0446 36L34.3976 7.45093C33.4574 3.94086 30.2767 1.5 26.6429 1.5V1.5C23.009 1.5 19.8283 3.94086 18.8881 7.45093L2 70.5H51.2857L45.125 47.7054"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  ) : (
    <svg
      width="63"
      height="72"
      viewBox="0 0 63 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.4821 1.5L2 70.5C2 70.5 13 63 26.5 63C40 63 51.2857 70.5 51.2857 70.5L32.8036 1.5H20.4821Z"
        fill="var(--bg-default)"
      />
      <path
        d="M26.6426 18.75V63.1071"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M19.25 53.25H34.0357"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M20.4824 42.1606H32.8039"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M21.7144 31.0713H31.5715"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M22.9463 19.9824H30.3391"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M26.3812 63.5L51.3812 32.5"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <circle
        cx="54.9822"
        cy="28.6072"
        r="5.89286"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M2 70.5003C6.92857 67.6253 15.5536 63.1074 26.6429 63.1074C37.7321 63.1074 46.3571 67.6253 51.2857 70.5003"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M42.0446 36L34.3976 7.45093C33.4574 3.94086 30.2767 1.5 26.6429 1.5V1.5C23.009 1.5 19.8283 3.94086 18.8881 7.45093L2 70.5H51.2857L45.125 47.7054"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  );
}
