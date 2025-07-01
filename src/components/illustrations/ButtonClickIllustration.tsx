import type { IllustrationProps } from './index';

export default function ButtonClickIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="133"
      height="62"
      viewBox="0 0 133 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="72"
        y="16"
        width="12"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="38"
        y="16"
        width="30"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <line
        x1="19.1415"
        y1="21.5053"
        x2="28.5054"
        y2="12.1413"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <line
        x1="20.7022"
        y1="22.066"
        x2="15.5"
        y2="16.8638"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M110 26.375V6C110 3.79086 108.209 2 106 2H6C3.79086 2 2 3.79086 2 6V28C2 30.2091 3.79086 32 6 32H94.7818"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M110.345 45.0019L116.002 50.6587C117.564 52.2208 120.097 52.2208 121.659 50.6587C123.221 49.0966 123.221 46.564 121.659 45.0019L116.002 39.345L124.134 31.2133L91.9602 20.9603L102.213 53.1336L110.345 45.0019Z"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
    </svg>
  ) : (
    <svg
      width="133"
      height="62"
      viewBox="0 0 133 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="2"
        y="1.5"
        width="107"
        height="30"
        rx="4"
        fill="var(--bg-default)"
      />
      <rect
        x="71.6188"
        y="16"
        width="12"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <rect
        x="37.6188"
        y="16"
        width="30"
        height="3"
        fill="var(--illustration-secondary)"
      />
      <line
        x1="18.7603"
        y1="21.5053"
        x2="28.1242"
        y2="12.1413"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <line
        x1="20.3209"
        y1="22.066"
        x2="15.1187"
        y2="16.8638"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M109.619 26.375V6C109.619 3.79086 107.828 2 105.619 2H5.61877C3.40964 2 1.61877 3.79086 1.61877 6V28C1.61877 30.2091 3.40964 32 5.61878 32H94.4006"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M109.964 45.0019L115.621 50.6587C117.183 52.2208 119.715 52.2208 121.277 50.6587C122.84 49.0966 122.84 46.564 121.277 45.0019L115.621 39.345L123.752 31.2133L91.5789 20.9603L101.832 53.1336L109.964 45.0019Z"
        fill="var(--bg-default)"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
    </svg>
  );
}
