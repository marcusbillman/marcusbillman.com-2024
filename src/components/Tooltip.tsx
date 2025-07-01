import * as RadixTooltip from '@radix-ui/react-tooltip';

interface Props {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: Props) {
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Content
        sideOffset={8}
        className="animate-popover-in data-[state=closed]:animate-popover-out z-50 rounded-lg bg-default p-3 py-2 text-base text-default shadow-lg"
      >
        {text}
      </RadixTooltip.Content>
    </RadixTooltip.Root>
  );
}
