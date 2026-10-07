export function resolveTag(segment, knownTags) {
  if (knownTags.includes(segment)) return segment;
  try {
    const decoded = decodeURIComponent(segment);
    return knownTags.includes(decoded) ? decoded : null;
  } catch {
    return null;
  }
}
