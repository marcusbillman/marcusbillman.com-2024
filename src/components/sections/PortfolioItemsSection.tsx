import type {
  DribbbleShot,
  PortfolioItem,
  Project,
  SideProject,
} from '@/utils/content';
import type { Icon } from '@phosphor-icons/react';

import { useEffect, useState } from 'react';
import {
  DribbbleLogoIcon,
  EyeClosedIcon,
  FlaskIcon,
  ImagesIcon,
} from '@phosphor-icons/react/ssr';
import { motion, useReducedMotion } from 'framer-motion';
import { twJoin, twMerge } from 'tailwind-merge';

import Switch from '@/components/Switch';
import { isExternalUrl } from '@/utils';
import { t } from '@/utils/i18n';
import { TIMING_FUNCTIONS } from '@/utils/tailwind';

interface PortfolioItemsSectionProps {
  portfolioItems: PortfolioItem[];
}

export default function PortfolioItemsSection({
  portfolioItems,
}: PortfolioItemsSectionProps) {
  const [filterOptions, setFilterOptions] = useState({
    caseStudies: true,
    sideProjects: true,
    dribbbleShots: false,
  });

  const filteredPortfolioItems = portfolioItems.filter((portfolioItem) => {
    switch (portfolioItem.collection) {
      case 'caseStudies':
        return filterOptions.caseStudies;
      case 'sideProjects':
        return filterOptions.sideProjects;
      case 'dribbbleShots':
        return filterOptions.dribbbleShots;
      default:
        return false;
    }
  });

  // Set filter options based on 'type' URL parameter
  // Example URL: '/portfolio?type=CASE_STUDY&type=SIDE_PROJECT'
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const types = urlParams.getAll('type');
    if (types.length === 0) return;

    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      caseStudies: types.includes('CASE_STUDY'),
      sideProjects: types.includes('SIDE_PROJECT'),
      dribbbleShots: types.includes('DRIBBBLE_SHOT'),
    }));
  }, []);

  return (
    <section className="px-4 py-16 lg:px-16">
      <div className="flex flex-col gap-8 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <h2 className="text-4xl font-medium lg:text-6xl">
          {t('portfolio.myWork')}
        </h2>
        <div className="flex flex-col gap-4 overflow-hidden rounded-2xl lg:flex-row lg:gap-0 lg:divide-x lg:divide-default lg:border lg:border-default">
          <FilterOption
            label={t('portfolio.caseStudies')}
            icon={ImagesIcon}
            isEnabled={filterOptions.caseStudies}
            onChange={() => {
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                caseStudies: !prevOptions.caseStudies,
              }));
            }}
          />
          <FilterOption
            label={t('portfolio.sideProjects')}
            icon={FlaskIcon}
            isEnabled={filterOptions.sideProjects}
            onChange={() => {
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                sideProjects: !prevOptions.sideProjects,
              }));
            }}
          />
          <FilterOption
            label={t('portfolio.dribbbleShots')}
            icon={DribbbleLogoIcon}
            isEnabled={filterOptions.dribbbleShots}
            onChange={() => {
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                dribbbleShots: !prevOptions.dribbbleShots,
              }));
            }}
          />
        </div>
      </div>
      <ul className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-y-32">
        {filteredPortfolioItems.map((portfolioItem) => (
          <PortfolioItemCard
            key={portfolioItem.id}
            portfolioItem={portfolioItem}
          />
        ))}
        {filteredPortfolioItems.length === 0 && (
          <motion.div
            className="flex flex-col items-center gap-4 rounded-2xl border border-default px-4 py-16 lg:col-span-2 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <EyeClosedIcon size={32} className="text-subtle lg:hidden" />
            <EyeClosedIcon size={64} className="hidden text-subtle lg:block" />
            <div className="flex flex-col gap-2 lg:gap-4">
              <p className="text-center text-xl font-medium lg:text-3xl">
                {t('portfolio.emptyState.heading')}
              </p>
              <p className="text-center text-subtle lg:text-xl">
                {t('portfolio.emptyState.text')}
              </p>
            </div>
          </motion.div>
        )}
      </ul>
    </section>
  );
}

interface PortfolioItemCardProps {
  portfolioItem: PortfolioItem;
}

function PortfolioItemCard({ portfolioItem }: PortfolioItemCardProps) {
  function href() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
        return `/portfolio/${(portfolioItem as Project).id}`;
      case 'sideProjects':
        return (portfolioItem as SideProject).data.url;
      case 'dribbbleShots':
        return (portfolioItem as DribbbleShot).data.html_url;
      default:
        return undefined;
    }
  }

  function imageUrl() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
      case 'sideProjects':
        return (portfolioItem as Project).data.cover.astroImage.src;
      case 'dribbbleShots':
        return (portfolioItem as DribbbleShot).data.images.hidpi;
      default:
        return undefined;
    }
  }

  function imageAlt() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
      case 'sideProjects':
        return (portfolioItem as Project).data.name;
      case 'dribbbleShots':
        return (portfolioItem as DribbbleShot).data.title;
      default:
        return undefined;
    }
  }

  function name() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
      case 'sideProjects':
        return (portfolioItem as Project).data.name;
      default:
        return undefined;
    }
  }

  function date() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
      case 'sideProjects':
        return (portfolioItem as Project).data.date;
      case 'dribbbleShots':
        return (
          portfolioItem as DribbbleShot
        ).data.published_at.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
        });
      default:
        return undefined;
    }
  }

  function headline() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
      case 'sideProjects':
        return (portfolioItem as Project).data.headline;
      case 'dribbbleShots':
        return (portfolioItem as DribbbleShot).data.title;
      default:
        return undefined;
    }
  }

  function PortfolioItemTagComponent() {
    switch (portfolioItem.collection) {
      case 'caseStudies':
        return (
          <PortfolioItemTag
            label={t('portfolio.caseStudy')}
            icon={ImagesIcon}
          />
        );
      case 'sideProjects':
        return (
          <PortfolioItemTag
            label={t('portfolio.sideProject')}
            icon={FlaskIcon}
          />
        );
      case 'dribbbleShots':
        return (
          <PortfolioItemTag
            label={t('portfolio.dribbbleShot')}
            icon={DribbbleLogoIcon}
          />
        );
      default:
        return undefined;
    }
  }

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      key={portfolioItem.id}
      lang={portfolioItem.data.locale}
      layout={!shouldReduceMotion}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 200,
        rotate: shouldReduceMotion ? 0 : 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
      className="group"
    >
      <a
        href={href()}
        target={isExternalUrl(href() || '') ? '_blank' : '_self'}
        className="block h-full"
      >
        <img
          src={imageUrl()}
          alt={imageAlt()}
          loading="lazy"
          className="aspect-photo w-full rounded-2xl object-cover transition-all group-focus-within:shadow-lg group-hover:shadow-lg motion-safe:duration-500 motion-safe:ease-smooth motion-safe:group-focus-within:scale-105 motion-safe:group-hover:rotate-3 motion-safe:group-hover:scale-105 2xl:rounded-4xl motion-safe:2xl:group-hover:rotate-1"
        />
        <div className="mt-6 flex flex-col gap-3">
          <div
            className={twJoin(
              name() ? 'flex' : 'hidden lg:flex',
              'items-center',
            )}
          >
            <div className="flex grow items-center gap-4">
              {name() && (
                <h3 className="font-serif text-xl font-medium italic text-primary lg:text-2xl 2xl:text-3xl">
                  {name()}
                </h3>
              )}
              <div className="hidden lg:block">
                <PortfolioItemTagComponent />
              </div>
            </div>
            <span className="hidden text-subtle lg:inline 2xl:text-2xl">
              {date()}
            </span>
          </div>
          <p className="text-balance text-3xl lg:text-4xl 2xl:text-5xl">
            {headline()}
          </p>
          <div className="flex items-center gap-3 lg:hidden">
            <PortfolioItemTagComponent />
            <span className="text-subtle">{date()}</span>
          </div>
        </div>
      </a>
    </motion.li>
  );
}

interface PortfolioItemTagProps {
  label: string;
  icon: Icon;
  className?: string;
}

function PortfolioItemTag({ label, icon, className }: PortfolioItemTagProps) {
  const IconComponent = icon;

  return (
    <div
      className={twMerge(
        'flex items-center gap-1 rounded-lg border border-default px-2 py-1 text-subtle 2xl:px-3 2xl:py-2',
        className,
      )}
    >
      <span className="2xl:hidden">
        <IconComponent size={16} />
      </span>
      <span className="hidden 2xl:inline">
        <IconComponent size={24} />
      </span>
      <span className="2xl:text-2xl">{label}</span>
    </div>
  );
}

interface FilterOptionProps {
  label: string;
  icon: Icon;
  isEnabled: boolean;
  onChange: () => void;
}

function FilterOption({ label, icon, isEnabled, onChange }: FilterOptionProps) {
  const IconComponent = icon;

  const id = `filter-${label.toLowerCase().replace(' ', '-')}`;

  return (
    <div
      className={twJoin(
        'flex grow cursor-pointer items-center gap-4 transition-all active:opacity-50 motion-safe:active:scale-90 lg:p-6',
        isEnabled ? 'font-bold text-default' : 'text-subtle',
      )}
      onClick={onChange}
    >
      <div className="flex grow items-center gap-2">
        <IconComponent size={24} weight={isEnabled ? 'fill' : 'regular'} />
        <label
          htmlFor={id}
          className="pointer-events-none text-xl 2xl:text-2xl"
        >
          {label}
        </label>
      </div>
      <Switch id={id} size="small" checked={isEnabled} />
    </div>
  );
}
