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
import t from '@/utils/i18n';

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleMenu() {
    setIsModalOpen(!isModalOpen);
    navigator.vibrate(100);
  }

  return (
    <section className="flex flex-col items-center md:px-4 md:pb-4 lg:px-16 lg:pb-40">
      <div className="relative isolate flex w-full flex-col items-center gap-12 overflow-hidden rounded-2xl bg-subtle px-4 py-16 shadow-lg lg:w-fit lg:rotate-3 lg:gap-16 lg:p-16">
        <h2 className="text-balance text-center text-4xl lg:text-6xl">
          {t('contact.heading')}
        </h2>
        <div className="flex flex-col items-center gap-4 2xl:flex-row 2xl:gap-8">
          <Button
            text={t('contact.openForm')}
            icon={ChatsCircle}
            style="primary"
            onClick={toggleMenu}
          />
          <AnimatePresence>
            {isModalOpen && <ContactFormModal onClose={toggleMenu} />}
          </AnimatePresence>
          <div className="text-xl text-subtle lg:text-2xl">
            {t('contact.or')}
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border bg-default p-4 lg:flex-row lg:pl-6">
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
        </div>

        {/* Backgrounds */}
        <DotGrid />
        <Glow
          color="orange"
          className="left-[10%] top-[10%] w-full -translate-x-1/2 -translate-y-1/2"
        />
        <Glow
          color="blueberry"
          className="bottom-[10%] right-[10%] w-full translate-x-1/2 translate-y-1/2"
        />
      </div>
    </section>
  );
}
