import { useState } from 'react';
import {
  ChatsCircle,
  Copy,
  EnvelopeSimple,
} from '@phosphor-icons/react/dist/ssr';
import { AnimatePresence } from 'framer-motion';

import Button from '@/components/Button';
import ContactFormModal from '@/components/ContactFormModal';
import CopyToClipboard from '@/components/CopyToClipboard';
import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import { LinkedIn } from '@/components/icons';
import t from '@/utils/i18n';

export default function FullContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex min-h-[75vh] flex-col items-center justify-center px-4 py-32 lg:p-32">
      <h1 className="text-balance text-center text-5xl lg:text-8xl">
        {t('contact.heading')}
      </h1>
      <Button
        text={t('contact.openForm')}
        icon={ChatsCircle}
        style="primary"
        className="mt-16"
        onClick={() => setIsModalOpen(true)}
      />
      <AnimatePresence>
        {isModalOpen && (
          <ContactFormModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
      <span className="mt-6 text-xl text-subtle">{t('contact.or')}</span>
      <div className="mt-6 flex w-full max-w-5xl flex-col gap-4 md:flex-row lg:gap-8">
        <div className="flex flex-col gap-4 rounded-2xl border bg-default p-4 md:flex-1 lg:p-6">
          <div className="flex items-center gap-2">
            <EnvelopeSimple size={24} className="lg:hidden" />
            <EnvelopeSimple size={32} className="hidden lg:block" />
            <span className="text-xl font-medium lg:text-2xl">
              {t('common.socials.emailAddress')}
            </span>
          </div>
          <div className="flex gap-2 lg:gap-3">
            <CopyToClipboard text={t('common.socials.emailAddress')}>
              <Button
                text={t('contact.emailCopy')}
                icon={Copy}
                size="small"
                className="lg:hidden"
              />
              <Button
                text={t('contact.emailCopy')}
                icon={Copy}
                size="medium"
                className="hidden lg:block"
              />
            </CopyToClipboard>
            <Button
              text={t('contact.emailOpen')}
              href={`mailto:${t('common.socials.emailAddress')}`}
              style="subtle"
              size="small"
              className="lg:hidden"
            />
            <Button
              text={t('contact.emailOpen')}
              href={`mailto:${t('common.socials.emailAddress')}`}
              style="subtle"
              size="medium"
              className="hidden lg:block"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border bg-default p-4 md:flex-1 lg:p-6">
          <div className="flex items-center gap-2">
            <LinkedIn size={24} className="lg:hidden" />
            <LinkedIn size={32} className="hidden lg:block" />
            <span className="text-xl font-medium lg:text-2xl">
              {t('common.socials.linkedin')}
            </span>
          </div>
          <div className="flex gap-2 lg:gap-3">
            <Button
              text={t('contact.linkedinVisit')}
              href={`https://m-b.me/linkedin`}
              style="subtle"
              size="small"
              className="lg:hidden"
            />
            <Button
              text={t('contact.linkedinVisit')}
              href={`https://m-b.me/linkedin`}
              style="subtle"
              size="medium"
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>

      {/* Backgrounds */}
      <DotGrid dim="default" />
      <Glow
        color="blueberry"
        className="right-[10%] top-1/3 w-full -translate-y-1/2 translate-x-1/2"
      />
      <Glow
        color="orange"
        className="bottom-[10%] left-1/3 h-full -translate-x-1/2 translate-y-1/2"
      />
    </section>
  );
}
