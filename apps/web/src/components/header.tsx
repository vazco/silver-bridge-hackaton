import { Link } from "@tanstack/react-router";

import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/przychodnie", label: "Przychodnie" },
  ] as const;

  return (
    <header>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav
          className="flex gap-4 text-lg"
          role="navigation"
          aria-label="Nawigacja główna"
        >
          {links.map(({ to, label }) => {
            return (
              <Link
                key={to}
                to={to}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
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
