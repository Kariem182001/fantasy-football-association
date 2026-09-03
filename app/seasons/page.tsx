import Navbar from "@/components/Navbar";

export default function SeasonsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA History
        </p>

        <h2 className="mt-3 text-5xl font-bold tracking-tight">
          Seasons
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Explore every season in Fantasy Football Association history,
          from the inaugural 2026 season and beyond.
        </p>
      </section>

      {/* 2026 Season */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <a
          href="/seasons/2026"
          className="block rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500/50 hover:bg-slate-800/70"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Inaugural Season
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                2026 Season
              </h3>

              <p className="mt-3 text-slate-400">
                The first season in Fantasy Football Association history.
              </p>
            </div>

            <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400">
              Season Upcoming
            </div>
          </div>

          {/* Season Details */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-2xl font-bold">2</p>
              <p className="mt-1 text-sm text-slate-500">
                Divisions
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-2xl font-bold">20</p>
              <p className="mt-1 text-sm text-slate-500">
                Teams
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-2xl font-bold">0</p>
              <p className="mt-1 text-sm text-slate-500">
                Games Played
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-2xl font-bold">0</p>
              <p className="mt-1 text-sm text-slate-500">
                Championships
              </p>
            </div>
          </div>

          {/* Divisions */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Division 1
              </p>

              <h4 className="mt-2 text-xl font-bold">
                Premier League Division 1
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                10 teams
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Division 2
              </p>

              <h4 className="mt-2 text-xl font-bold">
                Division 2 Championship
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                10 teams
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* Future Seasons */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Coming Later
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            Future Seasons
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            As the FFA grows, future seasons will be added here with
            complete standings, statistics, schedules, championships,
            promotion, and relegation history.
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