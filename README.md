# marcusbillman.com

![Designer, developer and human](https://github.com/marcusbillman/marcusbillman.com-2024/blob/main/public/images/social-embed-en.jpg?raw=true)

My personal website and portfolio, hosted at [marcusbillman.com](https://marcusbillman.com) 🇬🇧 and [marcusbillman.se](https://marcusbillman.se) 🇸🇪. The website is fully designed and built by me. This repo contains the source code and you can also check out the [Figma design file](https://m-b.me/website-figma)!

## Technologies

The site is written in TypeScript using these lovely technologies, among others:

- 🧑‍🚀 [Astro](https://astro.build/) as the web framework
- ⚛️ [React](https://react.dev/) for interactive UI
- 🧠 [Tailwind CSS](https://tailwindcss.com/) for styling
- 💫 [Motion](https://www.framer.com/motion/) for animations
- ▲ [Vercel](https://vercel.com/) for hosting

The code is linted with [ESLint](https://eslint.org/) and formatted with [Prettier](https://prettier.io/).

## Content management

The site features content in the form of case studies and side projects for my portfolio. This content is stored as MDX and YAML files inside `src/content/` and is managed by Astro content collections. In the past I used Sanity (a cloud-hosted CMS), but I switched away because I wanted something simpler to maintain.

## Localisation

The site is available in both English and Swedish. Strings are stored in JSON files inside `src/strings/` and are read using a simple "library" I wrote. An environment variable determines which language to use and therefore I host two instances of the site — one for each language.

## Design tokens

Styling is done using semantic design tokens enforced by my Tailwind theme, which is based on the variables in the Figma design file. For example, the custom Tailwind utility `bg-default` sets the background colour to the token of the same name, which resolves to `colors.gray.900` in light mode or `colors.white` in dark mode.
