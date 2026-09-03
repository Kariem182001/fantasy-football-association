import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          Inaugural Season
        </p>

        <h2 className="mt-3 text-5xl font-bold tracking-tight">
          Welcome to the FFA
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Follow every season, rivalry, championship, promotion, relegation,
          record, and moment in Fantasy Football Association history.
        </p>
      </section>

      {/* Divisions */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Division 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-slate-700">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Division 1
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Premier League Division 1
            </h3>

            <p className="mt-3 text-slate-400">
              The top flight of the Fantasy Football Association.
            </p>

            <div className="mt-6 rounded-lg bg-slate-950 p-4 text-sm text-slate-300">
              10 Teams
            </div>
          </div>

          {/* Division 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-slate-700">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Division 2
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Division 2 Championship
            </h3>

            <p className="mt-3 text-slate-400">
              The second tier, where teams fight for promotion.
            </p>

            <div className="mt-6 rounded-lg bg-slate-950 p-4 text-sm text-slate-300">
              10 Teams
            </div>
          </div>
        </div>
      </section>

      {/* FFA History */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            The Beginning
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            FFA History
          </h3>

          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            The Fantasy Football Association began in 2026 with two
            ten-team divisions. This website will preserve the history of
            every season as the league grows.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
              <p className="text-2xl font-bold">2026</p>
              <p className="mt-1 text-sm text-slate-500">
                Founded
              </p>
            </div>
          </div>
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