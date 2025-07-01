import type { RefObject } from 'react';

import * as RadixPopover from '@radix-ui/react-popover';

interface Props {
  collisionBoundary?: RefObject<HTMLElement>;
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export default function Popover({
  collisionBoundary,
  trigger,
  children,
}: Props) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Content
        side="top"
        sideOffset={8}
        align="start"
        collisionBoundary={collisionBoundary?.current}
        collisionPadding={24}
        className="animate-popover-in data-[state=closed]:animate-popover-out z-50 w-96 rounded-2xl border bg-default p-6 text-default shadow-lg ease-smooth"
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Root>
  );
}
