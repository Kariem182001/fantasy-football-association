import Link from "next/link";
import Navbar from "@/components/Navbar";

const premierLeagueTeams = [
  "Team Juhlianong",
  "Team Alex743gr8",
  "Team Megatron429",
  "Team Amrsobhi12",
  "Team Mcfly214",
  "Team Nandp12",
  "Team Ryuikari",
  "Team Julair18",
  "Team Mitchofell",
  "Team WilliemCCE",
];

const divisionTwoTeams = [
  "Team Yoshiyash12",
  "Team Sciencecryingah",
  "Team Seal Team Nix",
  "Team Zainabkahlon",
  "Team Fgoolsarran",
  "Team Smdadam",
  "Team Rushibh",
  "Team The Dart Knight",
  "Team Junzilla",
  "Team Iamjaaaden",
];

function teamUrl(team: string) {
  return team.toLowerCase().replace(/\s+/g, "-");
}

function TeamCard({ team }: { team: string }) {
  return (
    <Link
      href={`/teams/${teamUrl(team)}`}
      className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-800"
    >
      <p className="text-lg font-bold text-white">{team}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          2026
        </span>

        <span className="text-sm font-medium text-blue-400">
          View Team →
        </span>
      </div>
    </Link>
  );
}

export default function TeamsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
          FFA Rosters
        </p>

        <h2 className="mt-3 text-5xl font-bold tracking-tight">
          Teams
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
          Explore every team competing in the inaugural Fantasy Football
          Association season.
        </p>
      </section>

      {/* Premier League */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Division 1
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            Premier League Division 1
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {premierLeagueTeams.map((team) => (
            <TeamCard key={team} team={team} />
          ))}
        </div>
      </section>

      {/* Division Two */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Division 2
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            Division 2 Championship
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {divisionTwoTeams.map((team) => (
            <TeamCard key={team} team={team} />
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