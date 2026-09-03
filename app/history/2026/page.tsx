import Navbar from "@/components/Navbar";

const seasons = [
  {
    year: "2026",
    title: "Inaugural Season",
    description:
      "The first season in Fantasy Football Association history.",
    status: "Upcoming",
  },
  {
    year: "2027",
    title: "Season 2",
    description:
      "FFA history continues with another season of competition.",
    status: "Future",
  },
  {
    year: "2028",
    title: "Season 3",
    description:
      "More teams, more competition, and more FFA history.",
    status: "Future",
  },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA Archives
        </p>

        <h2 className="mt-3 text-5xl font-bold tracking-tight">
          History
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Follow the history of the Fantasy Football Association
          from the inaugural season and beyond.
        </p>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="space-y-6">
          {seasons.map((season) =>
            season.year === "2026" ? (
              <a
                key={season.year}
                href="/history/2026"
                className="block rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-blue-500/50 hover:bg-slate-800/70"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                      {season.year}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {season.title}
                    </h3>

                    <p className="mt-3 text-slate-400">
                      {season.description}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                    {season.status}
                  </span>
                </div>
              </a>
            ) : (
              <div
                key={season.year}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                      {season.year}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {season.title}
                    </h3>

                    <p className="mt-3 text-slate-400">
                      {season.description}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-400">
                    {season.status}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Future History */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            FFA Legacy
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            More History Coming Soon
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Championships, promotions, relegations, major milestones,
            league expansions, and other important events will be
            recorded here as the FFA grows.
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