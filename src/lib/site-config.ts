function publicHttpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return undefined;
    return url.href;
  } catch { return undefined; }
}

function publicOrigin(value: string | undefined): string | undefined {
  const normalized = publicHttpUrl(value);
  if (!normalized) return undefined;
  const url = new URL(normalized);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.port || !host.includes('.') || host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host === '[::1]' || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return undefined;
  return url.origin;
}
export const siteOrigin = publicOrigin(process.env.NEXT_PUBLIC_SITE_URL);
export const trialHref = publicHttpUrl(process.env.NEXT_PUBLIC_TRIAL_URL);
const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
export const contactEmail = configuredEmail && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(configuredEmail) ? configuredEmail : undefined;
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string): string {
  if (!basePath) return path;
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
