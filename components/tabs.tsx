"use client";

import { useEffect, useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

function useScrollProgress(enabled: boolean) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);
  return progress;
}

/*
 * Quiet tabs for long-form project content. Active tab syncs to the URL
 * hash so positions are shareable. All panels are server-rendered; the
 * inactive ones are hidden, not removed.
 *
 * withOutline (long research reports only): adds a floating right-hand
 * rail with the section list, current position, quick-jump, and a
 * reading-progress indicator.
 */
export function Tabs({
  tabs,
  withOutline = false,
}: {
  tabs: TabDef[];
  withOutline?: boolean;
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const progress = useScrollProgress(withOutline);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (tabs.some((t) => t.id === fromHash)) setActive(fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
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

  const panels = tabs.map((tab) => (
    <div
      key={tab.id}
      role="tabpanel"
      id={`panel-${tab.id}`}
      aria-labelledby={`tab-${tab.id}`}
      hidden={tab.id !== active}
      className="pt-12"
    >
      {tab.content}
    </div>
  ));

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

      {/* Floating section rail — long reports only. */}
      <aside className="hidden xl:block" aria-label="Report sections">
        <div className="sticky top-16">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-information/50">
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
          <div className="mt-8">
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-information/50">
              Progress
            </p>
            <div className="mt-3 h-px w-full bg-structure/20">
              <div
                className="h-px bg-interaction"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <p className="mt-2 font-sans text-[0.65rem] tracking-[0.2em] text-information/50">
              {Math.round(progress * 100)}%
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
