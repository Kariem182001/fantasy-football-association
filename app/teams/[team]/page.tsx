import Navbar from "@/components/Navbar";
import {
  getDivision1TeamRecords,
  getDivision2TeamRecords,
  getDivision1HeadToHead,
  getDivision2HeadToHead,
  getDivision1RivalryStats,
  getDivision2RivalryStats,
} from "@/lib/matchups";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ team: string }>;
}) {
  const { team } = await params;

  const [division1, division2] = await Promise.all([
    getDivision1TeamRecords(18),
    getDivision2TeamRecords(18),
  ]);

  const allTeams = [
    ...division1.map((item) => ({
      ...item,
      division: "Premier League Division 1",
    })),
    ...division2.map((item) => ({
      ...item,
      division: "Division 2 Championship",
    })),
  ];

  const currentTeam = allTeams.find(
    (item) =>
      item.team.toLowerCase().replace(/\s+/g, "-") === team
  );

  if (!currentTeam) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 py-20">
          <h1 className="text-4xl font-bold">
            Team Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            The team you are looking for does not exist.
          </p>
        </section>
      </main>
    );
  }

  const isDivision1 =
    currentTeam.division ===
    "Premier League Division 1";

  const [headToHead, rivalryStats] =
    await Promise.all([
      isDivision1
        ? getDivision1HeadToHead(currentTeam.team, 18)
        : getDivision2HeadToHead(currentTeam.team, 18),

      isDivision1
        ? getDivision1RivalryStats(currentTeam.team, 18)
        : getDivision2RivalryStats(currentTeam.team, 18),
    ]);

  const bestRecord =
    headToHead.length > 0
      ? [...headToHead].sort(
          (a, b) =>
            b.winPercentage - a.winPercentage
        )[0]
      : null;

  const worstRecord =
    headToHead.length > 0
      ? [...headToHead].sort(
          (a, b) =>
            a.winPercentage - b.winPercentage
        )[0]
      : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          2026 Inaugural Season
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          {currentTeam.team}
        </h1>

        <div className="mt-5 flex flex-wrap gap-3">
          <span
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              isDivision1
                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {currentTeam.division}
          </span>

          <span className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300">
            Active
          </span>
        </div>
      </section>

      {/* Record */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            All-Time Record
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Career Statistics
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Games Played
            </p>

            <p className="mt-2 text-3xl font-bold">
              {currentTeam.gamesPlayed}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Wins
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {currentTeam.wins}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Losses
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {currentTeam.losses}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-500">
              Win Percentage
            </p>

            <p className="mt-2 text-3xl font-bold">
              {currentTeam.winPercentage}%
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Championships & Achievements
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Career Achievements
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["0", "Championships"],
              ["0", "Runner-Up Finishes"],
              ["0", "Playoff Appearances"],
              ["—", "Best Finish"],
              ["0", "Awards"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl bg-slate-950 p-5"
              >
                <p className="text-2xl font-bold">
                  {value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season History */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Season History
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Season-by-Season History
          </h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[850px]">
              <thead className="bg-slate-950">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Season</th>
                  <th className="px-5 py-4">Division</th>
                  <th className="px-5 py-4">Record</th>
                  <th className="px-5 py-4">Final Position</th>
                  <th className="px-5 py-4">Playoffs</th>
                  <th className="px-5 py-4">
                    Promotion/Relegation
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-slate-800">
                  <td className="px-5 py-5 font-semibold">
                    2026
                  </td>

                  <td className="px-5 py-5 text-slate-400">
                    {currentTeam.division}
                  </td>

                  <td className="px-5 py-5 text-slate-400">
                    {currentTeam.wins}–
                    {currentTeam.losses}
                  </td>

                  <td className="px-5 py-5 text-slate-500">
                    Season in progress
                  </td>

                  <td className="px-5 py-5 text-slate-500">
                    —
                  </td>

                  <td className="px-5 py-5 text-slate-500">
                    —
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Head to Head */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Head-to-Head
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Record vs. Every Opponent
          </h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-950">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">
                    Opponent
                  </th>
                  <th className="px-5 py-4">Wins</th>
                  <th className="px-5 py-4">Losses</th>
                  <th className="px-5 py-4">Win %</th>
                  <th className="px-5 py-4">Games</th>
                </tr>
              </thead>

              <tbody>
                {headToHead.length > 0 ? (
                  headToHead.map((record) => (
                    <tr
                      key={record.opponent}
                      className="border-t border-slate-800"
                    >
                      <td className="px-5 py-5 font-semibold">
                        {record.opponent}
                      </td>

                      <td className="px-5 py-5 text-emerald-400">
                        {record.wins}
                      </td>

                      <td className="px-5 py-5 text-red-400">
                        {record.losses}
                      </td>

                      <td className="px-5 py-5 text-slate-400">
                        {record.winPercentage}%
                      </td>

                      <td className="px-5 py-5 text-slate-400">
                        {record.games}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-slate-800">
                    <td
                      colSpan={5}
                      className="px-5 py-8 text-center text-slate-500"
                    >
                      No head-to-head games yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Rivalries */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-400">
            Rivalry Stats
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Rivalries
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Most-Played Opponent
              </p>

              <p className="mt-2 font-bold">
                {headToHead[0]?.opponent ?? "—"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Best Record Against
              </p>

              <p className="mt-2 font-bold">
                {bestRecord?.opponent ?? "—"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Worst Record Against
              </p>

              <p className="mt-2 font-bold">
                {worstRecord?.opponent ?? "—"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Longest Win Streak
              </p>

              <p className="mt-2 text-2xl font-bold">
                {rivalryStats.longestWinningStreak}
              </p>
            </div>

            <div className="rounded-xl bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                Longest Losing Streak
              </p>

              <p className="mt-2 text-2xl font-bold">
                {rivalryStats.longestLosingStreak}
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