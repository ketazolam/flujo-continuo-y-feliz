/** Extract YouTube video ID from a URL. Returns null for non-YouTube URLs or nullish input. */
export const getYoutubeId = (url?: string | null): string | null => {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
};

/** Get YouTube thumbnail URL, or null. */
export const getYoutubeThumbnail = (url?: string | null): string | null => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
};

/** Get YouTube embed URL. Returns null if not a YouTube URL. */
export const getYoutubeEmbedUrl = (url?: string | null): string | null => {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null;
};

/** Resolve the actual playable video source from a galeria item (video_url or imagen_url). */
export const resolveVideoSource = (item: { video_url?: string | null; imagen_url?: string | null }): string | null => {
  return item.video_url || item.imagen_url || null;
};

/** Check if a URL points to a direct video file (not YouTube). */
export const isDirectVideoFile = (url?: string | null): boolean => {
  if (!url) return false;
  // If it's a YouTube URL, it's not a direct file
  if (getYoutubeId(url)) return false;
  return true;
};
