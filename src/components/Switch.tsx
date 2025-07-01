import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';

interface Props {
  /** The state of the switch when it is initially rendered. Use when you do not need to control its state. */
  defaultChecked?: boolean;
  /** The controlled state of the switch. */
  checked?: boolean;
  size?: 'small' | 'medium';
  id?: string;
  onChange?: (isChecked?: boolean) => void;
}

export default function Switch({
  defaultChecked = false,
  checked,
  size = 'medium',
  id,
  onChange,
}: Props) {
  const [isChecked, setIsChecked] = useState(checked || defaultChecked);

  useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  const handleToggle = () => {
    // Only update the state if the switch is not controlled
    if (checked == undefined) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      if (onChange) onChange(newValue);
    } else {
      if (onChange) onChange(!checked);
    }
  };

  return (
    <div
      className={twJoin(
        'relative inline-block rounded-full transition-colors duration-300 ease-smooth focus-within:ring focus-within:ring-offset-4',
        size === 'small' ? 'h-8 w-14' : 'h-10 w-[72px]',
        isChecked ? 'bg-primary' : 'border border-strong bg-default',
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        id={id}
        onChange={handleToggle}
        className="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
      />
      <span
        className={twJoin(
          'absolute bottom-1 left-1 top-1 aspect-square rounded-full transition-all duration-300 ease-smooth',
          isChecked ? 'translate-x-full bg-default' : 'bg-gray-400',
        )}
      ></span>
    </div>
  );
}
