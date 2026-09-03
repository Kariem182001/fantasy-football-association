import Navbar from "@/components/Navbar";

export default function Season2026Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA Season
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          2026 Season
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          The inaugural season of the Fantasy Football Association.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Season Status
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Season Upcoming
          </h2>

          <p className="mt-3 text-slate-400">
            The 2026 season has not started yet. Season information
            will update as games are played.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Division 1
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Premier League Division 1
            </h2>

            <p className="mt-3 text-slate-400">
              10 teams competing for the inaugural FFA championship.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Division 2
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Division 2 Championship
            </h2>

            <p className="mt-3 text-slate-400">
              10 teams competing in the second FFA division.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8">
        <p className="text-center text-sm text-slate-500">
          Fantasy Football Association • Est. 2026
        </p>
      </footer>
    </main>
  );
}