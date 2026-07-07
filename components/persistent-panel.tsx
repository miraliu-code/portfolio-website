import { buildCoordinateMap } from "@/lib/coordinates";
import { ThemeToggle } from "./theme-toggle";
import { CoordinateBadge } from "./coordinate-badge";
import { MobileDrawer } from "./mobile-drawer";
import { Contact, Identity, ResumeSection, Rule } from "./panel-sections";

/*
 * The persistent Blue Ink panel (Standard 07): the publication's spine.
 * Fixed right on large screens; on smaller screens the MobileDrawer
 * provides the same content as a full-screen overlay.
 */
export function PersistentPanel() {
  const coordinateMap = buildCoordinateMap();

  return (
    <>
      <aside className="panel-scope fixed inset-y-0 right-0 z-10 hidden w-72 flex-col bg-panel px-10 py-12 lg:flex">
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto">
          <Identity />
          <Rule />
          <Contact />
          <Rule />
          <ResumeSection />
          <div className="space-y-4">
            <ThemeToggle />
            <CoordinateBadge map={coordinateMap} />
          </div>
        </div>
      </aside>

      <MobileDrawer coordinateMap={coordinateMap} />
    </>
  );
}
