import { ArrowUpRight, Copy } from '@phosphor-icons/react/dist/ssr';
import { twJoin } from 'tailwind-merge';

import CopyToClipboard from '@/components/CopyToClipboard';
import t from '@/utils/i18n';

interface Props {
  /** Make the component always look like dark theme instead of using dynamic colour tokens */
  forceDark?: boolean;
  /** Hide link labels on mobile to make the component more compact */
  compactOnMobile?: boolean;
}

export default function SocialLinks({
  forceDark = false,
  compactOnMobile = false,
}: Props) {
  return (
    <ul
      className={twJoin(
        'grid flex-1 grid-cols-2',
        compactOnMobile ? 'gap-y-3 lg:gap-y-6' : 'gap-y-6',
      )}
    >
      <SocialLink
        primaryText={t('common.socials.linkedin')}
        secondaryText={t('common.socials.linkedinDescription')}
        url="https://m-b.me/linkedin"
        forceDark={forceDark}
        compactOnMobile={compactOnMobile}
      />
      <SocialLink
        primaryText={t('common.socials.github')}
        secondaryText={t('common.socials.githubDescription')}
        url="https://m-b.me/github"
        forceDark={forceDark}
        compactOnMobile={compactOnMobile}
      />
      <SocialLink
        primaryText={t('common.socials.dribbble')}
        secondaryText={t('common.socials.dribbbleDescription')}
        url="https://m-b.me/dribbble"
        forceDark={forceDark}
        compactOnMobile={compactOnMobile}
      />
      <SocialLink
        primaryText={t('common.socials.soundcloud')}
        secondaryText={t('common.socials.soundcloudDescription')}
        url="https://m-b.me/soundcloud"
        forceDark={forceDark}
        compactOnMobile={compactOnMobile}
      />
      <li className="col-span-2">
        <span
          className={twJoin(
            'font-medium',
            compactOnMobile && 'hidden lg:inline',
            forceDark ? 'text-gray-400' : 'text-subtle',
          )}
        >
          {t('common.socials.emailDescription')}
        </span>
        <CopyToClipboard text={t('common.socials.emailAddress')}>
          <button className="group mt-1 flex cursor-pointer items-center gap-1">
            <span className={compactOnMobile ? 'lg:text-xl' : 'text-xl'}>
              {t('common.socials.emailAddress')}
            </span>
            <Copy
              size={16}
              className={twJoin(
                'transition-all duration-500 ease-smooth group-hover:rotate-180',
                compactOnMobile ? 'lg:hidden' : 'hidden',
                forceDark
                  ? 'text-gray-400 group-hover:text-gray-100'
                  : 'text-subtle group-hover:text-default',
              )}
            />
            <Copy
              size={24}
              className={twJoin(
                'transition-all duration-500 ease-smooth group-hover:rotate-180',
                compactOnMobile && 'hidden lg:block',
                forceDark
                  ? 'text-gray-400 group-hover:text-gray-100'
                  : 'text-subtle group-hover:text-default',
              )}
            />
          </button>
        </CopyToClipboard>
      </li>
    </ul>
  );
}

interface SocialLinkProps {
  /** Main link text, e.g. 'SoundCloud' */
  primaryText: string;
  /** Descriptive label text, e.g. 'Music' */
  secondaryText: string;
  url: string;
  forceDark: boolean;
  compactOnMobile: boolean;
}

function SocialLink({
  primaryText,
  secondaryText,
  url,
  forceDark,
  compactOnMobile,
}: SocialLinkProps) {
  return (
    <li>
      <span
        className={twJoin(
          'font-medium',
          compactOnMobile && 'hidden lg:inline',
          forceDark ? 'text-gray-400' : 'text-subtle',
        )}
      >
        {secondaryText}
      </span>
      <a
        href={url}
        target="_blank"
        className="group mt-1 flex items-center gap-1"
      >
        <span className={compactOnMobile ? 'lg:text-xl' : 'text-xl'}>
          {primaryText}
        </span>
        <ArrowUpRight
          size={16}
          className={twJoin(
            'transition-all duration-500 ease-smooth group-hover:-translate-y-[20%] group-hover:translate-x-[20%]',
            compactOnMobile ? 'lg:hidden' : 'hidden',
            forceDark
              ? 'text-gray-400 group-hover:text-gray-100'
              : 'text-subtle group-hover:text-default',
          )}
        />
        <ArrowUpRight
          size={24}
          className={twJoin(
            'transition-all duration-500 ease-smooth group-hover:-translate-y-[20%] group-hover:translate-x-[20%]',
            compactOnMobile && 'hidden lg:block',
            forceDark
              ? 'text-gray-400 group-hover:text-gray-100'
              : 'text-subtle group-hover:text-default',
          )}
        />
      </a>
    </li>
  );
}
