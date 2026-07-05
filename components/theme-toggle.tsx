"use client";

import { useEffect, useState } from "react";

/*
 * Light is the publication's default (the memo defines a single light
 * palette); dark is an extrapolated variant — see DESIGN_SYSTEM.md.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("atlas-theme");
    if (stored === "dark") setTheme("dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("atlas-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="font-sans text-xs uppercase tracking-[0.2em] text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
    >
      Theme · {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}
