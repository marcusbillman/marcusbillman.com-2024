interface Props {
  className?: string;
}

export default function WaveLine({ className }: Props) {
  return (
    <div
      className={`animate-wave-line h-3 bg-current [mask-image:url('/assets/images/tiled/wave.svg')] [mask-size:contain] ${className}`}
    ></div>
  );
}
