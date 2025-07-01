export async function fetchSoundcloudTracks(count: number) {
  const { SOUNDCLOUD_CLIENT_ID } = import.meta.env;
  const SOUNDCLOUD_URL = `https://api-v2.soundcloud.com/users/24249114/tracks?client_id=${SOUNDCLOUD_CLIENT_ID}&limit=${count}`;

  const response = await fetch(SOUNDCLOUD_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch SoundCloud tracks: ${response.statusText}`,
    );
  }

  const rawTracks: SoundcloudTracksRaw = await response.json();

  const parsedTracks: SoundcloudTrack[] = rawTracks.collection.map(
    (rawTrack) => ({
      artwork_url: rawTrack.artwork_url,
      created_at: new Date(rawTrack.created_at),
      description: rawTrack.description,
      duration: rawTrack.duration,
      genre: rawTrack.genre,
      id: rawTrack.id,
      permalink_url: rawTrack.permalink_url,
      title: rawTrack.title,
      user: {
        avatar_url: rawTrack.user.avatar_url,
        username: rawTrack.user.username,
        permalink_url: rawTrack.user.permalink_url,
      },
    }),
  );

  return parsedTracks;
}

type SoundcloudTracksRaw = {
  collection: SoundcloudTrackRaw[];
  next_href: string;
  query_urn: string | null;
};

type SoundcloudTrackRaw = {
  artwork_url: string;
  caption: string | null;
  commentable: boolean;
  comment_count: number;
  created_at: string;
  description: string;
  downloadable: boolean;
  download_count: number;
  duration: number;
  full_duration: number;
  embeddable_by: string;
  genre: string;
  has_downloads_left: boolean;
  id: number;
  kind: string;
  label_name: string | null;
  last_modified: string;
  license: string;
  likes_count: number;
  permalink: string;
  permalink_url: string;
  playback_count: number;
  public: boolean;
  publisher_metadata: {
    id: number;
    urn: string;
    contains_music: boolean;
  };
  purchase_title: string | null;
  purchase_url: string | null;
  release_date: string | null;
  reposts_count: number;
  secret_token: string | null;
  sharing: string;
  state: string;
  streamable: boolean;
  tag_list: string;
  title: string;
  uri: string;
  urn: string;
  user_id: number;
  visuals: unknown;
  waveform_url: string;
  display_date: string;
  media: {
    transcodings: {
      url: string;
      preset: string;
      duration: number;
      snipped: boolean;
      format: {
        protocol: string;
        mime_type: string;
      };
      quality: string;
    }[];
  };
  station_urn: string;
  station_permalink: string;
  track_authorization: string;
  monetization_model: string;
  policy: string;
  user: {
    avatar_url: string;
    first_name: string;
    followers_count: number;
    full_name: string;
    id: number;
    kind: string;
    last_modified: string;
    last_name: string;
    permalink: string;
    permalink_url: string;
    uri: string;
    urn: string;
    username: string;
    verified: boolean;
    city: string;
    country_code: string;
    badges: {
      pro: boolean;
      creator_mid_tier: boolean;
      pro_unlimited: boolean;
      verified: boolean;
    };
    station_urn: string;
    station_permalink: string;
  };
};

export type SoundcloudTrack = {
  artwork_url: string;
  created_at: Date;
  description: string;
  duration: number;
  genre: string;
  id: number;
  permalink_url: string;
  title: string;
  user: {
    avatar_url: string;
    username: string;
    permalink_url: string;
  };
};
