import Navbar from "@/components/Navbar";
import {
  getDivision1Matchups,
  getDivision2Matchups,
} from "@/lib/matchups";

export default async function SchedulePage() {
  const division1Matchups = await getDivision1Matchups(18);
  const division2Matchups = await getDivision2Matchups(18);

  const weeks = Array.from({ length: 18 }, (_, index) => index + 1);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          2026 Season
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Schedule
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Follow every matchup throughout the Fantasy Football
          Association season.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="space-y-8">

          {weeks.map((week) => {
            const division1Week = division1Matchups.filter(
              (matchup) => matchup.week === week
            );

            const division2Week = division2Matchups.filter(
              (matchup) => matchup.week === week
            );

            return (
              <div
                key={week}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >

                {/* WEEK HEADER */}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                      Week {week}
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Matchups
                    </h2>
                  </div>

                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                    {division1Week.length + division2Week.length} Games
                  </span>
                </div>


                {/* DIVISION 1 */}

                <div className="mt-8">

                  <h3 className="text-lg font-bold">
                    Premier League Division 1
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Top Division
                  </p>

                  {division1Week.length > 0 ? (
                    <div className="mt-4 space-y-3">

                      {division1Week.map((matchup, index) => (
                        <div
                          key={`division1-${matchup.week}-${index}`}
                          className="rounded-xl bg-slate-950 p-5"
                        >

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                              <p className="font-semibold">
                                {matchup.team1}
                              </p>

                              <p className="my-1 text-sm text-slate-500">
                                vs.
                              </p>

                              <p className="font-semibold">
                                {matchup.team2}
                              </p>
                            </div>

                            <div className="text-left sm:text-right">

                              <p className="text-sm text-slate-500">
                                Score
                              </p>

                              <p className="mt-1 text-xl font-bold">
                                {matchup.team1Points} – {matchup.team2Points}
                              </p>

                            </div>

                          </div>

                        </div>
                      ))}

                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-dashed border-slate-800 p-6 text-center">

                      <p className="font-medium text-slate-400">
                        Matchups not available yet
                      </p>

                    </div>
                  )}

                </div>


                {/* DIVISION 2 */}

                <div className="mt-10 border-t border-slate-800 pt-8">

                  <h3 className="text-lg font-bold">
                    Division 2 Championship
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Second Division
                  </p>

                  {division2Week.length > 0 ? (
                    <div className="mt-4 space-y-3">

                      {division2Week.map((matchup, index) => (
                        <div
                          key={`division2-${matchup.week}-${index}`}
                          className="rounded-xl bg-slate-950 p-5"
                        >

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                              <p className="font-semibold">
                                {matchup.team1}
                              </p>

                              <p className="my-1 text-sm text-slate-500">
                                vs.
                              </p>

                              <p className="font-semibold">
                                {matchup.team2}
                              </p>
                            </div>

                            <div className="text-left sm:text-right">

                              <p className="text-sm text-slate-500">
                                Score
                              </p>

                              <p className="mt-1 text-xl font-bold">
                                {matchup.team1Points} – {matchup.team2Points}
                              </p>

                            </div>

                          </div>

                        </div>
                      ))}

                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-dashed border-slate-800 p-6 text-center">

                      <p className="font-medium text-slate-400">
                        Matchups not available yet
                      </p>

                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      </section>


      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-8">

        <p className="text-center text-sm text-slate-500">
          Fantasy Football Association • Est. 2026
        </p>

      </footer>

    </main>
  );
}