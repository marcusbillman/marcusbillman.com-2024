import { useState } from 'react';
import { useForm } from '@formspree/react';
import { CircleNotch, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';
import confetti from 'canvas-confetti';
import { motion, useAnimate } from 'framer-motion';
import { AutoFocusInside } from 'react-focus-on';
import { toast } from 'sonner';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import t from '@/utils/i18n';

interface Props {
  onClose: () => void;
}

export default function ContactFormModal({ onClose }: Props) {
  const [isDirty, setIsDirty] = useState(false);
  const [hasWarned, setHasWarned] = useState(false);
  const [scope, animate] = useAnimate();
  const [state, handleSubmit, reset] = useForm(
    import.meta.env.PUBLIC_FORMSPREE_ID,
  );

  function handleClose() {
    if (!isDirty) return onClose();
    if (hasWarned) return onClose();

    shakeForm();
    toast.warning(t('contact.form.toastWarning'));
    navigator.vibrate(200);
    setHasWarned(true);
  }

  function handleChange() {
    setIsDirty(true);
    setHasWarned(false);
  }

  if (state.succeeded) {
    toast.success(t('contact.form.toastSuccess'));
    confetti();
    onClose();
  }

  if (state.errors) {
    toast.error(t('contact.form.toastErrorTitle'), {
      description: t('contact.form.toastErrorDescription'),
    });
    reset();
  }

  function shakeForm() {
    animate(
      scope.current,
      { x: [-10, 10, -10, 10, -10, 10, 0] },
      { duration: 0.5 },
    );
  }

  return (
    <Modal title={t('contact.form.heading')} onClose={handleClose}>
      <form
        className={`relative flex flex-col gap-6 transition-opacity`}
        ref={scope}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        {state.submitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-default text-subtle"
          >
            <CircleNotch size={32} className="animate-spin" />
            <p>{t('contact.form.sending')}</p>
          </motion.div>
        )}
        <AutoFocusInside>
          <div className="flex flex-col-reverse gap-2">
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t('contact.form.namePlaceholder')}
              required
              disabled={state.submitting}
              className="peer rounded-lg border bg-default px-4 py-3 text-xl transition-colors placeholder:text-subtle focus:border-primary"
            />
            <label
              htmlFor="name"
              className="block text-xl transition-colors peer-focus:font-serif peer-focus:font-medium peer-focus:italic peer-focus:text-primary"
            >
              {t('contact.form.name')}
            </label>
          </div>
        </AutoFocusInside>
        <div className="flex flex-col-reverse gap-2">
          <input
            type="email"
            id="email"
            name="email"
            placeholder={t('contact.form.emailPlaceholder')}
            required
            disabled={state.submitting}
            className="peer rounded-lg border bg-default px-4 py-3 text-xl transition-colors placeholder:text-subtle focus:border-primary"
          />
          <label
            htmlFor="email"
            className="block text-xl transition-colors peer-focus:font-serif peer-focus:font-medium peer-focus:italic peer-focus:text-primary"
          >
            {t('contact.form.email')}
          </label>
        </div>
        <div className="flex flex-col-reverse gap-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t('contact.form.messagePlaceholder')}
            required
            disabled={state.submitting}
            className="peer rounded-lg border bg-default px-4 py-3 text-xl transition-colors placeholder:text-subtle focus:border-primary"
          />
          <label
            htmlFor="message"
            className="block text-xl transition-colors peer-focus:font-serif peer-focus:font-medium peer-focus:italic peer-focus:text-primary"
          >
            {t('contact.form.message')}
          </label>
        </div>
        <Button
          text={t('contact.form.send')}
          icon={PaperPlaneTilt}
          iconSide="right"
          style="primary"
          type="submit"
          disabled={state.submitting}
          className="mt-4 w-full lg:mt-0 lg:w-fit"
        />
      </form>
    </Modal>
  );
}
