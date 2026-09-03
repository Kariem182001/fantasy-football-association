import Link from "next/link";
import Navbar from "@/components/Navbar";
import { teams } from "@/lib/teams";

export default function TeamHistoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA Archives
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Team History
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Explore the complete history, achievements, records, and
          rivalries of every Fantasy Football Association team.
        </p>
      </section>

      {/* All-Time Information */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            All-Time Records
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Complete Team Histories
          </h2>

          <p className="mt-3 max-w-3xl text-slate-400">
            Each team has a complete history of its seasons,
            championships, playoff appearances, promotions,
            relegations, and head-to-head results against every
            opponent.
          </p>
        </div>
      </section>

      {/* Teams */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Teams
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Select a Team
          </h2>

          <p className="mt-3 text-slate-400">
            Choose a team to view its complete FFA history.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/teams/${team.id}`}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500/50 hover:bg-slate-800/70"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">
                  {team.name}
                </h3>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
                  2026
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-400">
                {team.division}
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-500">
                <p>All-Time Record: 0–0</p>
                <p>Win Percentage: 0%</p>
                <p>Championships: 0</p>
                <p>Playoff Appearances: 0</p>
              </div>

              <p className="mt-5 text-sm font-semibold text-blue-400">
                View Team History →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Future Data */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Coming Later
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Head-to-Head History
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Once game results are connected, each team's page will
            automatically track its all-time record against every
            opponent, including wins, losses, win percentage, and
            rivalry statistics.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <p className="text-center text-sm text-slate-500">
          Fantasy Football Association • Est. 2026
        </p>
      </footer>
    </main>
  );
}