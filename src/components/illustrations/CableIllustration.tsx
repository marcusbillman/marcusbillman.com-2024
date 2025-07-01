import type { IllustrationProps } from './index';

export default function CableIllustration({
  transparent = false,
  ...props
}: IllustrationProps) {
  return transparent ? (
    <svg
      width="125"
      height="108"
      viewBox="0 0 125 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.5463 106.986C16.4491 91.4564 21.3462 74.1919 34.2003 70.7477C47.0544 67.3034 50.8191 84.0597 62.8817 79.0148C74.9443 73.9699 68.3343 54.713 82.2811 43.1505"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M101.553 10.3996L114.281 23.1276L94.4822 42.9266C90.9675 46.4413 85.269 46.4413 81.7543 42.9266C78.2396 39.4118 78.2396 33.7133 81.7543 30.1986L101.553 10.3996Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M115.696 4.74264C116.867 3.57107 118.767 3.57107 119.938 4.74264C121.11 5.91421 121.11 7.81371 119.938 8.98528L110.039 18.8848L105.796 14.6421L115.696 4.74264Z"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  ) : (
    <svg
      width="125"
      height="108"
      viewBox="0 0 125 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.4014 106.986C16.3041 91.4564 21.2013 74.1919 34.0553 70.7477C46.9094 67.3034 50.6741 84.0597 62.7368 79.0148C74.7994 73.9699 68.1893 54.713 82.1361 43.1505"
        stroke="var(--illustration-secondary)"
        strokeWidth="3"
      />
      <path
        d="M101.408 10.3996L114.136 23.1276L94.3372 42.9266C90.8225 46.4413 85.124 46.4413 81.6093 42.9266C78.0946 39.4118 78.0946 33.7133 81.6093 30.1986L101.408 10.3996Z"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
      <path
        d="M115.551 4.74264C116.722 3.57107 118.622 3.57107 119.793 4.74264C120.965 5.91421 120.965 7.81371 119.793 8.98528L109.894 18.8848L105.651 14.6421L115.551 4.74264Z"
        fill="var(--bg-default)"
        stroke="var(--illustration-primary)"
        strokeWidth="3"
      />
    </svg>
  );
}
