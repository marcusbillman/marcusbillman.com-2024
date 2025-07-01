import Button from '@/components/Button';
import t from '@/utils/i18n';

export default function BioSection() {
  return (
    <section className="flex flex-col items-center gap-12 px-4 pb-24 pt-32 lg:px-16 lg:pb-32 lg:pt-64">
      <h2 className="text-balance text-center text-4xl font-medium lg:text-6xl">
        {t('home.bio.heading.beforeEmoji') + ' '}
        <span className="inline-block origin-bottom-right motion-safe:animate-wiggle">
          👋
        </span>
        <br className="md:hidden" />
        {' ' + t('home.bio.heading.afterEmoji')}
      </h2>
      <p className="max-w-[40ch] text-balance text-center text-2xl text-subtle lg:text-4xl 2xl:text-6xl">
        {t('home.bio.text')}
      </p>
      <Button
        text={t('home.bio.cta')}
        href="about"
        size="medium"
        style="primary"
        className="lg:hidden"
      />
      <Button
        text={t('home.bio.cta')}
        href="about"
        size="large"
        style="primary"
        className="hidden lg:block"
      />
    </section>
  );
}
