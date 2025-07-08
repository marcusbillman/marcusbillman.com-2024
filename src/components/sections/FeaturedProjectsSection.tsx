import type { Project } from '@/utils/content';

import Button from '@/components/Button';
import t from '@/utils/i18n';

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export default function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  return (
    <section className="px-4 lg:px-16">
      <h2 className="text-4xl font-medium lg:text-6xl">
        {t('home.featuredProjects.heading')}
      </h2>
      <ul className="relative isolate mt-12 flex flex-col gap-32 pb-12 lg:mt-16 lg:pb-16">
        <div
          className="absolute left-12 -z-10 h-full w-px border-l-4 border-dotted border-l-default"
          aria-hidden
        />
        {projects.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}
      </ul>
      <div className="mt-6 lg:mt-16">
        <Button
          text={t('home.featuredProjects.all')}
          href="portfolio"
          style="subtle"
        />
      </div>
    </section>
  );
}

interface FeaturedProjectProps {
  project: Project;
}

function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <li className="flex flex-col-reverse gap-6 bg-default py-6 lg:flex-row lg:items-center lg:gap-0 lg:bg-transparent lg:py-0 2xl:items-start">
      <div className="top-16 flex h-fit flex-col gap-6 bg-default lg:w-full lg:gap-8 lg:py-8 lg:pr-16 2xl:py-16 motion-safe:2xl:sticky">
        <div
          lang={project.data.locale}
          className="flex flex-col gap-2 lg:gap-6"
        >
          <h3 className="font-serif text-xl font-medium italic text-primary lg:text-3xl">
            {project.data.name}
          </h3>
          <p className="text-balance text-3xl lg:text-4xl 2xl:text-6xl">
            {project.data.headline}
          </p>
        </div>
        <Button
          text={t('home.featuredProjects.viewCase')}
          href={'/portfolio/' + project.id}
        />
      </div>
      <img
        src={project.data.cover.astroImage.src}
        alt={project.data.name}
        loading="lazy"
        lang={project.data.locale}
        className="aspect-photo rounded-2xl object-cover lg:w-1/2"
      ></img>
    </li>
  );
}
