import { getImage } from 'astro:assets';

import portrait1 from '@/assets/images/portrait-1.png';
import portrait2 from '@/assets/images/portrait-2.png';
import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import t from '@/utils/i18n';

const optimizedPortrait1 = await getImage({ src: portrait1 });
const optimizedPortrait2 = await getImage({ src: portrait2 });

export default function FullBioSection() {
  return (
    <section className="grid grid-rows-[repeat(5,auto)] gap-x-8 gap-y-6 px-4 py-16 md:grid-cols-[2fr_1fr] lg:px-16 lg:pb-32 2xl:grid-cols-[1fr_1fr_1fr_2fr] 2xl:grid-rows-[repeat(3,auto)] 2xl:gap-y-12">
      <h2 className="content-end text-4xl font-medium 2xl:col-span-3 2xl:col-start-1 2xl:row-start-1 2xl:text-6xl">
        {t('about.bio.heading.paragraph1')}
      </h2>
      <p className="text-4xl font-medium 2xl:col-span-3 2xl:col-start-1 2xl:row-start-2 2xl:text-6xl">
        {t('about.bio.heading.paragraph2')}
      </p>
      <Portrait />
      <p className="max-w-prose text-xl">{t('about.bio.text.paragraph1')}</p>
      <p className="max-w-prose text-xl">{t('about.bio.text.paragraph2')}</p>
      <p className="max-w-prose text-xl">{t('about.bio.text.paragraph3')}</p>
    </section>
  );
}

function Portrait() {
  return (
    <div className="group relative isolate my-6 aspect-[3/4] overflow-hidden rounded-2xl bg-subtle md:col-start-[-2] md:row-span-full md:my-0 lg:rounded-4xl 2xl:row-span-full 2xl:self-center">
      <img
        src={optimizedPortrait1.src}
        alt={t('about.alt.portrait1')}
        className="absolute bottom-0 left-0 right-0 block transition-opacity duration-300 group-hover:opacity-0"
      />
      <img
        src={optimizedPortrait2.src}
        alt={t('about.alt.portrait2')}
        className="absolute bottom-0 left-0 right-0 block opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      <DotGrid />
      <Glow
        color="orange"
        className="right-[-40%] top-[-40%] w-[150%] transition-opacity duration-300 group-hover:opacity-0"
      />
      <Glow
        color="blueberry"
        className="right-[-40%] top-[-40%] w-[150%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </div>
  );
}
