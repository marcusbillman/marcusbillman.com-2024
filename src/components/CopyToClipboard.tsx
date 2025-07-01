import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

import t from '@/utils/i18n';

interface Props {
  /** The text to copy to the clipboard. */
  text: string;
  children: React.ReactNode;
}

/**
 * Wrapper component that copies the `text` prop to the clipboard when clicked.
 */
export default function CopyToClipboard({ text, children }: Props) {
  const [_copiedText, copy] = useCopyToClipboard();

  function handleClick(event: React.MouseEvent, text: string) {
    copy(text)
      .then(() => {
        toast.success(t('common.toastCopySuccess'));
        navigator.vibrate(10);
        confetti({
          origin: {
            x: event.clientX / window.innerWidth || undefined,
            y: event.clientY / window.innerHeight || undefined,
          },
          startVelocity: 20,
        });
      })
      .catch((error) => {
        toast.error(t('common.toastCopyError'));
        console.error(error);
      });
  }

  return (
    <div
      className="w-fit"
      onClick={(event: React.MouseEvent) => handleClick(event, text)}
    >
      {children}
    </div>
  );
}
