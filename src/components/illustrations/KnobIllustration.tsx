import type { IllustrationProps } from './index';

export default function KnobIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="67"
      height="78"
      viewBox="0 0 67 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="7"
        y="64"
        width="20"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="31"
        y="64"
        width="30"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <path
        d="M7.68362 52C4.39168 47.2485 2.45021 41.679 2.06931 35.8941C1.68842 30.1093 2.8826 24.3295 5.52264 19.1803C8.16267 14.0311 12.148 9.70849 17.0473 6.68037C21.9466 3.65225 27.5734 2.03393 33.3185 2.00053C39.0637 1.96713 44.7085 3.51993 49.6421 6.49089C54.5757 9.46184 58.6101 13.7378 61.3087 18.856C64.0074 23.9742 65.2675 29.7397 64.9527 35.5286C64.6378 41.3174 62.7601 46.9092 59.5226 51.6986"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M7.63284 52C3.60907 46.1398 1.64334 39.0695 2.05325 31.9313C2.46317 24.7932 5.22479 18.0043 9.8919 12.6615C14.559 7.31876 20.859 3.73426 27.7738 2.48721C34.6887 1.24016 41.8146 2.4034 48 5.78897"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M35 29L42 15"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <circle
        cx="33.5"
        cy="33.5"
        r="21"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  ) : (
    <svg
      width="68"
      height="78"
      viewBox="0 0 68 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.68362 52C4.39168 47.2485 2.45021 41.679 2.06931 35.8941C1.68842 30.1093 2.8826 24.3295 5.52264 19.1803C8.16267 14.0311 12.148 9.70849 17.0473 6.68037C21.9466 3.65225 27.5734 2.03393 33.3185 2.00053C39.0637 1.96713 44.7085 3.51993 49.6421 6.49089C54.5757 9.46184 58.6101 13.7378 61.3087 18.856C64.0074 23.9742 65.2675 29.7397 64.9527 35.5286C64.6378 41.3174 62.7601 46.9092 59.5226 51.6986"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M7.63284 52C3.60907 46.1398 1.64334 39.0695 2.05325 31.9313C2.46317 24.7932 5.22479 18.0043 9.8919 12.6615C14.559 7.31876 20.859 3.73426 27.7738 2.48721C34.6887 1.24016 41.8146 2.4034 48 5.78897"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <circle
        cx="33.5"
        cy="33.5"
        r="21"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M35 29L42 15"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <rect
        x="0.249969"
        y="57.5"
        width="67"
        height="16"
        rx="8"
        fill="var(--bg-default)"
      />
      <rect
        x="7"
        y="64"
        width="20"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="31"
        y="64"
        width="30"
        height="3"
        fill="var(--illustration-secondary)"
      />
    </svg>
  );
}
