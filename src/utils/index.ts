export function isExternalUrl(url: string) {
  return url.startsWith('http') || url.startsWith('mailto');
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
