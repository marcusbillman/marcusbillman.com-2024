import {
  CheckCircle,
  Info,
  Warning,
  WarningDiamond,
} from '@phosphor-icons/react/dist/ssr';
import { Toaster } from 'sonner';

export default function ToasterWrapper() {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={1}
      gap={8}
      toastOptions={{
        duration: 3000,
        unstyled: true,
        classNames: {
          toast:
            'flex w-full gap-1 rounded-4xl border bg-default px-6 py-4 font-sans text-lg shadow-xl',
          success: 'text-primary',
          warning: 'text-orange-500',
          error: 'text-orange-500',
          title: 'font-bold',
          description: 'text-subtle',
          icon: 'mt-[0.5ch]',
        },
      }}
      icons={{
        success: <CheckCircle weight="fill" />,
        info: <Info weight="fill" />,
        warning: <Warning weight="fill" />,
        error: <WarningDiamond weight="fill" />,
      }}
    />
  );
}
