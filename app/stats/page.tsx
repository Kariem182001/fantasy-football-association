import Navbar from "@/components/Navbar";

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA Statistics
        </p>

        <h2 className="mt-3 text-5xl font-bold tracking-tight">
          League Stats
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Track individual and team statistics throughout the Fantasy
          Football Association.
        </p>
      </section>

      {/* Season Status */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            2026 Season
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            Statistics Coming Soon
          </h3>

          <p className="mt-3 max-w-2xl text-slate-400">
            The 2026 season has not started yet. Once games begin,
            statistics will appear here automatically.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Highest Score
              </p>
              <p className="mt-2 text-2xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Lowest Score
              </p>
              <p className="mt-2 text-2xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Highest Team Total
              </p>
              <p className="mt-2 text-2xl font-bold">
                —
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Total Games
              </p>
              <p className="mt-2 text-2xl font-bold">
                0
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Stats */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Future Categories
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            What We'll Track
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Highest Weekly Score",
            "Lowest Weekly Score",
            "Most Points in a Season",
            "Best Win Percentage",
            "Longest Winning Streak",
            "Longest Losing Streak",
            "Highest Points For",
            "Highest Points Against",
            "Closest Matchup",
          ].map((stat) => (
            <div
              key={stat}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="font-semibold">{stat}</p>

              <p className="mt-2 text-sm text-slate-500">
                Coming when the season begins
              </p>
            </div>
          ))}
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