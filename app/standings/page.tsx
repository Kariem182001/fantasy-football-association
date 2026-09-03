import Navbar from "@/components/Navbar";
import {
  getDivision1TeamRecords,
  getDivision2TeamRecords,
} from "@/lib/matchups";

export default async function StandingsPage() {
  const [division1, division2] = await Promise.all([
    getDivision1TeamRecords(18),
    getDivision2TeamRecords(18),
  ]);

  function StandingsTable({
    teams,
  }: {
    teams: typeof division1;
  }) {
    return (
      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[700px]">
          <thead className="bg-slate-950">
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-4">Pos</th>
              <th className="px-5 py-4">Team</th>
              <th className="px-5 py-4">GP</th>
              <th className="px-5 py-4">W</th>
              <th className="px-5 py-4">L</th>
              <th className="px-5 py-4">Win %</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team, index) => (
              <tr
                key={team.team}
                className="border-t border-slate-800"
              >
                <td className="px-5 py-5 font-bold text-slate-300">
                  {index + 1}
                </td>

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
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          2026 Season
        </p>

        <h1 className="mt-3 text-5xl font-bold tracking-tight">
          Standings
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Follow the current standings of every Fantasy Football
          Association division.
        </p>
      </section>

      {/* Division 1 */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Division 1
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Premier League Division 1
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Updated automatically from Sleeper
          </p>

          <StandingsTable teams={division1} />
        </div>
      </section>

      {/* Division 2 */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Division 2
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            Division 2 Championship
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Updated automatically from Sleeper
          </p>

          <StandingsTable teams={division2} />
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