import type { SideProject } from '@/utils/content';

import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';

import { isExternalUrl } from '@/utils';
import { t } from '@/utils/i18n';

interface SideProjectsSectionProps {
  sideProjects: SideProject[];
}

export default function SideProjectsSection({
  sideProjects,
}: SideProjectsSectionProps) {
  return (
    <section id="side-projects" className="px-4 lg:px-16">
      <h2 className="text-4xl font-medium lg:text-6xl">
        {t('portfolio.sideProjects')}
      </h2>
      <p className="text-muted-foreground mt-8 max-w-prose text-xl lg:mt-16 lg:text-2xl">
        {t('portfolio.sideProjectsDescription')}
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8 xl:grid-cols-3">
        {sideProjects.map((sideProject) => (
          <SideProjectCard key={sideProject.id} sideProject={sideProject} />
        ))}
      </ul>
    </section>
  );
}

interface SideProjectCardProps {
  sideProject: SideProject;
}

function SideProjectCard({ sideProject }: SideProjectCardProps) {
  const compactUrl = new URL(sideProject.data.url || '').host;

  return (
    <li lang={sideProject.data.locale} className="grow">
      <a
        href={sideProject.data.url}
        target={isExternalUrl(sideProject.data.url || '') ? '_blank' : '_self'}
        className="group flex h-full flex-col gap-2 rounded-3xl border border-default p-4 lg:p-6"
      >
        <img
          src={sideProject.data.cover.astroImage.src}
          alt={sideProject.data.name}
          loading="lazy"
          className="aspect-photo w-full rounded-2xl border border-default object-cover transition-all group-focus-within:shadow-lg group-hover:shadow-lg motion-safe:duration-500 motion-safe:ease-smooth motion-safe:group-focus-within:scale-105 motion-safe:group-hover:rotate-3 motion-safe:group-hover:scale-105 motion-safe:2xl:group-hover:rotate-1"
        />
        <div className="flex grow flex-col gap-2 p-2">
          <div className="flex items-center">
            <h3 className="grow font-serif text-xl font-medium italic text-primary transition-all duration-500 group-hover:text-default lg:text-2xl">
              {sideProject.data.name}
            </h3>
            <span className="hidden text-subtle lg:inline">
              {sideProject.data.date}
            </span>
          </div>
          <p className="grow text-xl text-subtle">
            {sideProject.data.description}
          </p>
          <div className="flex items-center gap-1">
            <span className="transition-all duration-500 ease-smooth group-hover:text-primary">
              {compactUrl}
            </span>
            <ArrowUpRightIcon
              size={16}
              className="text-subtle transition-all duration-500 ease-smooth group-hover:-translate-y-[20%] group-hover:translate-x-[20%] group-hover:text-default"
            />
          </div>
        </div>
      </a>
    </li>
  );
}
