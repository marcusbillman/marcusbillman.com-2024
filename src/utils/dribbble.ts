export async function fetchDribbbleShots(count: number) {
  const { DRIBBBLE_ACCESS_TOKEN } = import.meta.env;
  const DRIBBBLE_URL = `https://api.dribbble.com/v2/user/shots?access_token=${DRIBBBLE_ACCESS_TOKEN}&per_page=${count}`;

  const response = await fetch(DRIBBBLE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch Dribbble shots: ${response.statusText}`);
  }

  const rawShots: DribbbleShotRaw[] = await response.json();

  const parsedShots = rawShots.map((rawShot) => ({
    description: rawShot.description || undefined,
    html_url: rawShot.html_url,
    id: rawShot.id.toString(),
    images: {
      hidpi: rawShot.images.hidpi,
      normal: rawShot.images.normal,
    },
    tags: rawShot.tags,
    title: rawShot.title,
    published_at: new Date(rawShot.published_at),
    updated_at: new Date(rawShot.updated_at),
    locale: 'en',
  }));

  return parsedShots;
}

// Simplified version of example response from https://developer.dribbble.com/v2/shots/
type DribbbleShotRaw = {
  animated: boolean;
  description: string | null;
  height: number;
  html_url: string;
  id: number;
  images: {
    hidpi: string;
    normal: string;
    one_x: string;
    two_x: string;
    four_x: string;
    teaser: string;
  };
  low_profile: boolean;
  tags: string[];
  title: string;
  width: number;
  published_at: string;
  updated_at: string;
  attachments: unknown[];
  projects: unknown[];
  video: unknown;
};
