"use client";

import { useEffect, useRef, useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

/*
 * Reading progress bound to the CONTENT element, not the page: 100%
 * means the viewport bottom has reached the end of the written body —
 * before Continue Exploring, not after it.
 */
function useContentProgress(
  ref: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
  activeTab: string | undefined,
) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      const p = (viewportBottom - top) / rect.height;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, ref, activeTab]);
  return progress;
}

/*
 * Quiet tabs for long-form project content. Active tab syncs to the URL
 * hash (and follows hash changes, so in-page links can switch tabs).
 *
 * withOutline (long research reports only):
 *  - the floating Sections rail appears ONLY on the Analysis tab
 *  - the reading-progress indicator appears on Analysis and
 *    Recommendations, measured against the written content's end
 *  - Analysis opens with a burgundy Download PDF link when one exists
 */
export function Tabs({
  tabs,
  withOutline = false,
  pdfHref,
}: {
  tabs: TabDef[];
  withOutline?: boolean;
  pdfHref?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const showSections = withOutline && active === "analysis";
  const showProgress =
    withOutline && (active === "analysis" || active === "recommendations");
  const progress = useContentProgress(contentRef, showProgress, active);

  useEffect(() => {
    const applyHash = () => {
      const fromHash = window.location.hash.replace("#", "");
      if (tabs.some((t) => t.id === fromHash)) setActive(fromHash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tab ids are static
  }, []);

  function select(id: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  const tabList = (
    <div
      role="tablist"
      aria-label="Project sections"
      className="flex flex-wrap gap-x-8 gap-y-2 border-b border-structure/20"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => select(tab.id)}
            className={`-mb-px border-b pb-3 font-sans text-xs uppercase tracking-[0.2em] transition-colors ${
              isActive
                ? "border-interaction text-interaction"
                : "border-transparent text-information/60 hover:text-interaction"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );

  const panels = (
    <div ref={contentRef}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
          className="pt-12"
        >
          {tab.id === "analysis" && pdfHref && (
            <p className="mb-10">
              <a
                href={pdfHref}
                className="font-sans text-xs uppercase tracking-[0.25em] text-interaction hover:underline hover:underline-offset-4"
              >
                Download PDF →
              </a>
            </p>
          )}
          {tab.content}
        </div>
      ))}
    </div>
  );

  if (!withOutline) {
    return (
      <div>
        {tabList}
        {panels}
      </div>
    );
  }

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_10rem] xl:gap-14">
      <div>
        {tabList}
        {panels}
      </div>

      {/* Floating rail: Sections on Analysis; Progress on Analysis + Recommendations. */}
      <aside className="hidden xl:block" aria-label="Report navigation">
        <div className="sticky top-16">
          {showSections && (
            <>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-information/60">
                Sections
              </p>
              <ul className="mt-4 space-y-2 border-l border-structure/20">
                {tabs.map((tab) => {
                  const isActive = tab.id === active;
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => {
                          select(tab.id);
                          window.scrollTo({ top: 0 });
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={`-ml-px block border-l py-0.5 pl-4 text-left font-sans text-xs tracking-wide transition-colors ${
                          isActive
                            ? "border-interaction text-interaction"
                            : "border-transparent text-information/60 hover:text-interaction"
                        }`}
                      >
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {showProgress && (
            <div className={showSections ? "mt-8" : undefined}>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-information/60">
                Progress
              </p>
              <div className="mt-3 h-px w-full bg-structure/20">
                <div
                  className="h-px bg-interaction"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <p className="mt-2 font-sans text-[0.65rem] tracking-[0.2em] text-information/60">
                {Math.round(progress * 100)}%
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
