import { twMerge } from 'tailwind-merge';

interface Props {
  label?: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ariaLabel?: string;
}

export default function NumberField({
  label,
  name,
  value,
  min,
  max,
  step,
  className,
  ariaLabel,
  onChange,
}: Props) {
  return (
    <div className={twMerge('group w-full', className)}>
      {label && (
        <label
          className="mb-2 inline-block group-focus-within:font-serif group-focus-within:font-medium group-focus-within:text-primary"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        type="number"
        name={name}
        id={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="form-input w-full rounded-lg border-default bg-default px-4 py-3 text-xl text-default focus:border-primary"
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
