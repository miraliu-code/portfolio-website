import type { Project } from "@/lib/content/types";
import { HighSpeedRailInteractive } from "./high-speed-rail";
import { ProfessionalNormsInteractive } from "./professional-norms";
import { AirportEcosystemInteractive } from "./airport-ecosystem";
import { ChinaPlusOneInteractive } from "./china-plus-one";
import { ChangiExperienceInteractive } from "./changi-experience";
import { MtrFollowTheSign } from "./mtr-wayfinding";
import { DutchCyclingInteractive } from "./dutch-cycling";

/*
 * Flagship interactives own their full section structure (they still
 * follow the shared design language internally).
 */
const customExperiences: Record<string, React.ComponentType> = {
  "high-speed-rail": HighSpeedRailInteractive,
  "professional-norms-worldwide": ProfessionalNormsInteractive,
  "airport-ecosystem": AirportEcosystemInteractive,
  "china-plus-one": ChinaPlusOneInteractive,
  "changi-airport-experience": ChangiExperienceInteractive,
  "hong-kong-mtr-wayfinding": MtrFollowTheSign,
  "dutch-cycling-infrastructure": DutchCyclingInteractive,
};

/*
 * The shared design language for every Atlas interactive (per the
 * editorial roadmap): Guiding Question → Orientation → Explore →
 * Key Insights → Continue Reading. One structure, learned once.
 */

interface InteractiveSpec {
  orientation: string;
  insights: string[];
  explore?: React.ReactNode;
}

/* Currently none: every shipped interactive is a flagship above. The
   generic frame below still serves explorable projects that are on
   the roadmap but not yet built. */
const interactives: Record<string, InteractiveSpec> = {};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-information/60">
      {children}
    </h3>
  );
}

export function InteractiveFrame({ project }: { project: Project }) {
  const Custom = customExperiences[project.slug];
  if (Custom) return <Custom />;

  const spec = interactives[project.slug];

  return (
    <div className="max-w-none space-y-12">
      <section>
        <SectionLabel>Guiding Question</SectionLabel>
        <p className="mt-4 max-w-2xl font-serif text-2xl italic leading-snug text-interaction">
          {project.question}
        </p>
      </section>

      <section>
        <SectionLabel>Orientation</SectionLabel>
        <p className="mt-4 max-w-2xl font-serif text-base leading-[1.85] text-information/85">
          {spec?.orientation ??
            "This investigation includes an interactive component — a web-native way to explore the system rather than read about it. The interactive is in development; the written portion carries the argument in the meantime. (Roadmap placeholder.)"}
        </p>
      </section>

      <section>
        <SectionLabel>Explore</SectionLabel>
        <div className="mt-6">
          {spec?.explore ?? (
            <div className="flex min-h-48 items-center justify-center border border-structure/25 bg-structure/5 p-10 text-center">
              <p className="max-w-sm font-serif text-sm italic leading-relaxed text-information/60">
                Interactive exploration in development — it will follow the
                same structure as every Atlas interactive.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionLabel>Key Insights</SectionLabel>
        {spec ? (
          <ul className="mt-5 max-w-2xl space-y-4">
            {spec.insights.map((insight) => (
              <li
                key={insight}
                className="border-l border-interaction/50 pl-5 font-serif text-base leading-relaxed text-information/90"
              >
                {insight}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 max-w-2xl font-serif text-sm italic text-information/60">
            Surfaced observations will connect the patterns you find back to
            the written argument. (Roadmap placeholder.)
          </p>
        )}
      </section>

      <section className="border-t border-structure/15 pt-8">
        <SectionLabel>Continue Reading</SectionLabel>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-information/85">
          The interactive shows you the system; the written{" "}
          {project.format.split(" + ")[0].toLowerCase()} makes the argument.
        </p>
        <a
          href="#overview"
          className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.25em] text-interaction hover:underline hover:underline-offset-4"
        >
          Return to the written report →
        </a>
      </section>
    </div>
  );
}
