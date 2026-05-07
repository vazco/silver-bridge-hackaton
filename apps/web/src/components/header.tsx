import { Link } from "@tanstack/react-router";

import type { FileRouteTypes } from "@/routeTree.gen";

import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const links: ReadonlyArray<{
    to: FileRouteTypes["fullPaths"];
    label: string;
  }> = [
    { to: "/", label: "Home" },
    { to: "/przychodnie", label: "Przychodnie" },
  ] as const;

  return (
    <header>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Przejdź do głównej treści
      </a>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg" aria-label="Nawigacja główna">
          {links.map(({ to, label }) => {
            return (
              <Link
                key={to}
                to={to}
                activeProps={{
                  className: "font-semibold underline",
                  "aria-current": "page",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <hr />
    </header>
  );
}
