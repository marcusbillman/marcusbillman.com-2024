import { twMerge } from 'tailwind-merge';

interface Props {
  label?: string;
  name: string;
  value: string;
  className?: string;
  ariaLabel?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

export default function SelectField({
  label,
  name,
  value,
  className,
  ariaLabel,
  onChange,
  children,
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
      <div className="relative">
        <select
          className="form-select relative w-full rounded-lg border-default bg-default py-3 pl-4 pr-11 text-xl text-default focus:border-primary"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          aria-label={ariaLabel}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
