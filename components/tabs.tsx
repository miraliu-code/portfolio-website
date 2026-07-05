"use client";

import { useEffect, useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

/*
 * Quiet tabs for long-form project content. Active tab syncs to the URL
 * hash so positions are shareable. All panels are server-rendered; the
 * inactive ones are hidden, not removed.
 */
export function Tabs({ tabs }: { tabs: TabDef[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (tabs.some((t) => t.id === fromHash)) setActive(fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  function select(id: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  return (
    <div>
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
      {tabs.map((tab) => (
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
      ))}
    </div>
  );
}
