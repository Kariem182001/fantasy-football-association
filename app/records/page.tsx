import Navbar from "@/components/Navbar";
import {
  getDivision1TeamRecords,
  getDivision2TeamRecords,
} from "@/lib/matchups";

export default async function RecordsPage() {
  const [division1Records, division2Records] =
    await Promise.all([
      getDivision1TeamRecords(18),
      getDivision2TeamRecords(18),
    ]);

  const records = [
    ...division1Records,
    ...division2Records,
  ];

  const mostWins = records.reduce(
    (best, team) =>
      team.wins > best.wins ? team : best,
    records[0]
  );

  const mostGames = records.reduce(
    (best, team) =>
      team.gamesPlayed > best.gamesPlayed
        ? team
        : best,
    records[0]
  );

  const bestWinPercentage = records.reduce(
    (best, team) =>
      team.winPercentage > best.winPercentage
        ? team
        : best,
    records[0]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA Records
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Records
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          The record book of the Fantasy Football Association.
          Records will update automatically as the season
          progresses.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">

          {/* Most Wins */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Most Wins
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {mostWins?.team ?? "—"}
            </h2>

            <p className="mt-2 text-4xl font-bold">
              {mostWins?.wins ?? 0}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              wins
            </p>
          </div>

          {/* Most Games */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Most Games Played
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {mostGames?.team ?? "—"}
            </h2>

            <p className="mt-2 text-4xl font-bold">
              {mostGames?.gamesPlayed ?? 0}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              games
            </p>
          </div>

          {/* Best Win Percentage */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-purple-400">
              Best Win %
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {bestWinPercentage?.team ?? "—"}
            </h2>

            <p className="mt-2 text-4xl font-bold">
              {bestWinPercentage?.winPercentage ?? 0}%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              win percentage
            </p>
          </div>
        </div>

        {/* Division 1 */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Record Book
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Premier League Division 1 Records
          </h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-950">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Team</th>
                  <th className="px-5 py-4">Games</th>
                  <th className="px-5 py-4">Wins</th>
                  <th className="px-5 py-4">Losses</th>
                  <th className="px-5 py-4">Win %</th>
                </tr>
              </thead>

              <tbody>
                {division1Records.map((team) => (
                  <tr
                    key={team.team}
                    className="border-t border-slate-800"
                  >
                    <td className="px-5 py-5 font-semibold">
                      {team.team}
                    </td>

                    <td className="px-5 py-5 text-slate-400">
                      {team.gamesPlayed}
                    </td>

                    <td className="px-5 py-5 font-semibold text-emerald-400">
                      {team.wins}
                    </td>

                    <td className="px-5 py-5 font-semibold text-red-400">
                      {team.losses}
                    </td>

                    <td className="px-5 py-5 text-slate-400">
                      {team.winPercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Division 2 */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-purple-400">
            Record Book
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Division 2 Championship Records
          </h2>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-950">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-4">Team</th>
                  <th className="px-5 py-4">Games</th>
                  <th className="px-5 py-4">Wins</th>
                  <th className="px-5 py-4">Losses</th>
                  <th className="px-5 py-4">Win %</th>
                </tr>
              </thead>

              <tbody>
                {division2Records.map((team) => (
                  <tr
                    key={team.team}
                    className="border-t border-slate-800"
                  >
                    <td className="px-5 py-5 font-semibold">
                      {team.team}
                    </td>

                    <td className="px-5 py-5 text-slate-400">
                      {team.gamesPlayed}
                    </td>

                    <td className="px-5 py-5 font-semibold text-emerald-400">
                      {team.wins}
                    </td>

                    <td className="px-5 py-5 font-semibold text-red-400">
                      {team.losses}
                    </td>

                    <td className="px-5 py-5 text-slate-400">
                      {team.winPercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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