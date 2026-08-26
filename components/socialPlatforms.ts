// Shared resolver for the `socials` frontmatter map used by SpeakerCard.vue
// (and, transitively, the `speaker` and `thank-you` layouts).
//
// Authors write the common case as a bare handle:
//
//   socials:
//     bluesky: "@jerdog.dev"
//     github: jerdog
//
// `resolveSocial` turns that into an icon + label + URL using the platform
// registry below. Anything the registry doesn't know is the escape hatch —
// pass an object instead of a string to fully control icon/label/url:
//
//   socials:
//     matrix:
//       icon: link
//       label: "@jerdog:matrix.org"
//       url: https://matrix.to/#/@jerdog:matrix.org
//
// This file is plain TypeScript (not a .vue SFC) so the resolution logic is
// unit-testable without mounting a component or the @slidev/client mock.

/** A known icon key. Every value here has a matching literal branch in
 * SocialIcon.vue — see that file's comment for why this can't just be an
 * arbitrary Iconify id. */
export type SocialIconKey =
  | "bluesky"
  | "mastodon"
  | "github"
  | "gitlab"
  | "linkedin"
  | "x"
  | "youtube"
  | "instagram"
  | "facebook"
  | "medium"
  | "discord"
  | "slack"
  | "email"
  | "website"
  | "link";

/** Explicit override shape — the escape hatch for platforms the registry
 * doesn't know, or for fully custom icon/label/url combinations. */
export interface SocialOverride {
  icon?: SocialIconKey;
  label?: string;
  url: string;
}

/** What an author writes as the *value* under a social platform key: either
 * a bare handle (resolved via the registry) or an explicit override. */
export type SocialValue = string | SocialOverride;

/** What SocialIcon.vue and SpeakerCard.vue actually render. */
export interface ResolvedSocial {
  platform: SocialIconKey;
  /** Brand-cased display name of the platform (e.g. "GitHub", "Bluesky"),
   * not a naive capitalization of the YAML key. Used by layouts that show
   * "<name>: <handle>" text (e.g. `thank-you`). */
  name: string;
  label: string;
  url: string;
}

const ALIASES: Record<string, SocialIconKey> = {
  twitter: "x",
};

function normalizeKey(key: string): SocialIconKey | undefined {
  const lower = key.toLowerCase();
  const known = ALIASES[lower] ?? lower;
  return isKnownPlatform(known) ? known : undefined;
}

const KNOWN_PLATFORMS = new Set<SocialIconKey>([
  "bluesky",
  "mastodon",
  "github",
  "gitlab",
  "linkedin",
  "x",
  "youtube",
  "instagram",
  "facebook",
  "medium",
  "discord",
  "slack",
  "email",
  "website",
  "link",
]);

function isKnownPlatform(key: string): key is SocialIconKey {
  return KNOWN_PLATFORMS.has(key as SocialIconKey);
}

/** Brand-cased display name per known platform — "GitHub" and "LinkedIn",
 * not what naive capitalization of "github"/"linkedin" would produce. */
const PLATFORM_LABELS: Record<SocialIconKey, string> = {
  bluesky: "Bluesky",
  mastodon: "Mastodon",
  github: "GitHub",
  gitlab: "GitLab",
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
  instagram: "Instagram",
  facebook: "Facebook",
  medium: "Medium",
  discord: "Discord",
  slack: "Slack",
  email: "Email",
  website: "Website",
  link: "Link",
};

// Unknown platform (the escape hatch): no brand casing to look up, so fall
// back to capitalizing whatever YAML key the author wrote.
const platformName = (key: string, normalized: SocialIconKey | undefined): string =>
  normalized ? PLATFORM_LABELS[normalized] : key.charAt(0).toUpperCase() + key.slice(1);

const stripAt = (handle: string) => handle.replace(/^@/, "");
const isUrl = (value: string) => /^https?:\/\//.test(value);

// Some platforms (discord invites, slack workspace links) have no fixed
// per-user URL pattern, so a bare handle can't be turned into a link — the
// author must supply a full URL. If they didn't, url comes back empty and
// SpeakerCard renders the label as plain (non-linking) text instead of a
// broken href.
const asIsIfUrl = (value: string) => (isUrl(value) ? value : "");

/** Builds a profile URL from a bare handle, per known platform. Keyed by
 * the *normalized* platform (post-alias), so "x" also covers "twitter". */
const URL_BUILDERS: Record<SocialIconKey, (handle: string) => string> = {
  bluesky: (h) => `https://bsky.app/profile/${stripAt(h)}`,
  mastodon: (h) => {
    if (isUrl(h)) return h;
    // "@user@instance.social" → "https://instance.social/@user"
    const match = /^@?([^@]+)@(.+)$/.exec(h);
    return match ? `https://${match[2]}/@${match[1]}` : h;
  },
  github: (h) => `https://github.com/${stripAt(h)}`,
  gitlab: (h) => `https://gitlab.com/${stripAt(h)}`,
  // Accepts either a bare handle ("jeremy-meiss") or a path already
  // rooted at "/in/..." or "/company/..." — both are common to copy
  // straight from a LinkedIn profile URL.
  linkedin: (h) => {
    if (isUrl(h)) return h;
    if (h.startsWith("/")) return `https://www.linkedin.com${h}`;
    return `https://www.linkedin.com/in/${stripAt(h)}`;
  },
  x: (h) => `https://x.com/${stripAt(h)}`,
  youtube: (h) => `https://youtube.com/${h.startsWith("@") ? h : `@${h}`}`,
  instagram: (h) => `https://instagram.com/${stripAt(h)}`,
  facebook: (h) => `https://facebook.com/${stripAt(h)}`,
  medium: (h) => `https://medium.com/@${stripAt(h)}`,
  discord: asIsIfUrl,
  slack: asIsIfUrl,
  email: (h) => (h.startsWith("mailto:") ? h : `mailto:${h}`),
  // Accepts either a bare domain ("jeremymeiss.com") or a full URL.
  website: (h) => (isUrl(h) ? h : `https://${h}`),
  link: (h) => (isUrl(h) ? h : `https://${h}`),
};

/**
 * Resolves one `socials` map entry into an icon + label + url.
 *
 * @param key   the YAML key under `socials:` (e.g. "bluesky", "github")
 * @param value either a bare handle string or a `SocialOverride` object
 */
export function resolveSocial(key: string, value: SocialValue): ResolvedSocial {
  const normalized = normalizeKey(key);
  const name = platformName(key, normalized);

  if (typeof value === "object" && value !== null) {
    return {
      platform: value.icon ?? normalized ?? "link",
      name,
      label: value.label ?? key,
      url: value.url,
    };
  }

  if (normalized) {
    return { platform: normalized, name, label: value, url: URL_BUILDERS[normalized](value) };
  }

  // Unknown platform key + bare string value: we don't know how to turn a
  // handle into a URL, so only link it if the value already looks like one.
  return { platform: "link", name, label: key, url: asIsIfUrl(value) };
}
