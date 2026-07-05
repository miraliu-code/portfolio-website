import { projects, projectHref } from "./content/projects";
import { domains, folders } from "./content/domains";

/*
 * pathname → Atlas coordinate, shown in the persistent panel.
 * Small derived map so the client badge doesn't import the full registry.
 */
export function buildCoordinateMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const d of domains) map[`/atlas/${d.slug}`] = d.prefix;
  for (const f of folders) {
    const d = domains.find((x) => x.slug === f.domain);
    if (d) map[`/atlas/${f.domain}/${f.slug}`] = d.prefix;
  }
  for (const p of projects) map[projectHref(p)] = p.coordinate;
  return map;
}
