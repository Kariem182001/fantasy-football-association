import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Seasons", href: "/seasons" },
  { name: "Teams", href: "/teams" },
  { name: "Standings", href: "/standings" },
  { name: "Schedule", href: "/schedule" },
  { name: "Stats", href: "/stats" },
  { name: "Records", href: "/records" },
  { name: "History", href: "/history" },
  { name: "Team History", href: "/team-history" },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group">
            <h1 className="text-2xl font-bold tracking-tight text-white transition group-hover:text-blue-400">
              FANTASY FOOTBALL ASSOCIATION
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              The home of our fantasy football history
            </p>
          </Link>

          <div className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300">
            2026 Season
          </div>
        </div>

        <nav className="flex gap-6 overflow-x-auto pb-4 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="whitespace-nowrap text-slate-400 transition hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}