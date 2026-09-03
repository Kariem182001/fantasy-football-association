"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Team = {
  id: number;
  name: string;
  owner: string;
  division: string;
};

type Matchup = {
  id: number;
  season: number;
  week: number;
  division: string;
  team1: string;
  team2: string;
  team1_points: number;
  team2_points: number;
};

type SeasonHistory = {
  id: number;
  season: number;
  team_name: string;
  division: string;
  wins: number;
  losses: number;
  final_position: number;
  playoff_result: string;
  movement: string;
};

const DIVISION_1 = "Premier League Division 1";
const DIVISION_2 = "Division 2 Championship";

export default function AdminPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [seasonHistory, setSeasonHistory] = useState<SeasonHistory[]>([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [selectedDivision, setSelectedDivision] =
    useState(DIVISION_1);

  const [selectedWeek, setSelectedWeek] = useState(1);

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  const [team1Points, setTeam1Points] = useState(0);
  const [team2Points, setTeam2Points] = useState(0);

  async function loadTeams() {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("Error loading teams.");
      return;
    }

    setTeams(data || []);
  }

  async function loadMatchups() {
    const { data, error } = await supabase
      .from("matchups")
      .select("*")
      .order("week", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("Error loading schedule.");
      return;
    }

    setMatchups(data || []);
  }

  async function loadSeasonHistory() {
    const { data, error } = await supabase
      .from("season_history")
      .select("*")
      .order("season", { ascending: true })
      .order("final_position", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("Error loading season history.");
      return;
    }

    setSeasonHistory(data || []);
  }

  useEffect(() => {
    async function load() {
      setLoading(true);

      await Promise.all([
        loadTeams(),
        loadMatchups(),
        loadSeasonHistory(),
      ]);

      setLoading(false);
    }

    load();
  }, []);

  function updateTeam(
    id: number,
    field: keyof Team,
    value: string
  ) {
    setTeams((current) =>
      current.map((team) =>
        team.id === id
          ? { ...team, [field]: value }
          : team
      )
    );
  }

  async function saveTeam(team: Team) {
    setMessage("");

    const { error } = await supabase
      .from("teams")
      .update({
        name: team.name,
        owner: team.owner,
        division: team.division,
      })
      .eq("id", team.id);

    if (error) {
      console.error(error);
      setMessage(`Error saving ${team.name}.`);
      return;
    }

    setMessage(`${team.name} saved.`);
  }

  async function saveMatchup() {
    setMessage("");

    if (!team1 || !team2) {
      setMessage("Please select both teams.");
      return;
    }

    if (team1 === team2) {
      setMessage("A team cannot play itself.");
      return;
    }

    const { data, error } = await supabase
      .from("matchups")
      .insert({
        season: 2026,
        week: selectedWeek,
        division: selectedDivision,
        team1,
        team2,
        team1_points: team1Points,
        team2_points: team2Points,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      setMessage("Error saving matchup.");
      return;
    }

    setMatchups((current) => [...current, data]);

    setTeam1("");
    setTeam2("");
    setTeam1Points(0);
    setTeam2Points(0);

    setMessage("Matchup saved.");
  }

  async function deleteMatchup(id: number) {
    setMessage("");

    const { error } = await supabase
      .from("matchups")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("Error deleting matchup.");
      return;
    }

    setMatchups((current) =>
      current.filter((matchup) => matchup.id !== id)
    );

    setMessage("Matchup deleted.");
  }

  function updateHistory(
    id: number,
    field: keyof SeasonHistory,
    value: string | number
  ) {
    setSeasonHistory((current) =>
      current.map((history) =>
        history.id === id
          ? { ...history, [field]: value }
          : history
      )
    );
  }

  async function saveHistory(history: SeasonHistory) {
    setMessage("");

    const { error } = await supabase
      .from("season_history")
      .update({
        season: history.season,
        team_name: history.team_name,
        division: history.division,
        wins: history.wins,
        losses: history.losses,
        final_position: history.final_position,
        playoff_result: history.playoff_result,
        movement: history.movement,
      })
      .eq("id", history.id);

    if (error) {
      console.error(error);
      setMessage(
        `Error saving ${history.team_name}.`
      );
      return;
    }

    setMessage(
      `${history.team_name} history saved.`
    );
  }

  const divisionTeams = teams.filter(
    (team) => team.division === selectedDivision
  );

  const filteredMatchups = matchups.filter(
    (matchup) =>
      matchup.division === selectedDivision &&
      matchup.week === selectedWeek
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8 text-white">
        <h1 className="text-3xl font-bold">
          FFA Admin
        </h1>

        <p className="mt-4 text-gray-400">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold">
          FFA Admin
        </h1>

        <p className="mt-2 text-gray-400">
          Manage your Fantasy Football Association.
        </p>

        {message && (
          <div className="mt-6 rounded-lg border border-gray-700 bg-gray-900 p-4">
            {message}
          </div>
        )}

        {/* =========================
            TEAM EDITOR
        ========================= */}

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            Team Editor
          </h2>

          {teams.length === 0 ? (
            <div className="mt-6 rounded-lg border border-gray-800 bg-gray-900 p-6">
              <p className="text-gray-400">
                No teams found.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-5"
                >
                  <div className="grid gap-4 md:grid-cols-3">

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Team Name
                      </label>

                      <input
                        value={team.name || ""}
                        onChange={(e) =>
                          updateTeam(
                            team.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Owner
                      </label>

                      <input
                        value={team.owner || ""}
                        onChange={(e) =>
                          updateTeam(
                            team.id,
                            "owner",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Division
                      </label>

                      <select
                        value={team.division || ""}
                        onChange={(e) =>
                          updateTeam(
                            team.id,
                            "division",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white outline-none"
                      >
                        <option value={DIVISION_1}>
                          Premier League Division 1
                        </option>

                        <option value={DIVISION_2}>
                          Division 2 Championship
                        </option>
                      </select>
                    </div>

                  </div>

                  <button
                    onClick={() => saveTeam(team)}
                    className="mt-4 rounded-lg bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200"
                  >
                    Save Changes
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* =========================
            SCHEDULE EDITOR
        ========================= */}

        <section className="mt-16">
          <h2 className="text-2xl font-bold">
            Schedule Editor
          </h2>

          <p className="mt-2 text-gray-400">
            Manually create the 2026 schedule for each division.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Division
              </label>

              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setTeam1("");
                  setTeam2("");
                }}
                className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
              >
                <option value={DIVISION_1}>
                  Premier League Division 1
                </option>

                <option value={DIVISION_2}>
                  Division 2 Championship
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Week
              </label>

              <select
                value={selectedWeek}
                onChange={(e) =>
                  setSelectedWeek(Number(e.target.value))
                }
                className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
              >
                {Array.from(
                  { length: 18 },
                  (_, index) => index + 1
                ).map((week) => (
                  <option key={week} value={week}>
                    Week {week}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-6">

            <h3 className="text-xl font-semibold">
              Add Matchup
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Team 1
                </label>

                <select
                  value={team1}
                  onChange={(e) =>
                    setTeam1(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                >
                  <option value="">
                    Select Team
                  </option>

                  {divisionTeams.map((team) => (
                    <option
                      key={team.id}
                      value={team.name}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Team 2
                </label>

                <select
                  value={team2}
                  onChange={(e) =>
                    setTeam2(e.target.value)
                  }
                  className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                >
                  <option value="">
                    Select Team
                  </option>

                  {divisionTeams.map((team) => (
                    <option
                      key={team.id}
                      value={team.name}
                    >
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Team 1 Score
                </label>

                <input
                  type="number"
                  value={team1Points}
                  onChange={(e) =>
                    setTeam1Points(
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Team 2 Score
                </label>

                <input
                  type="number"
                  value={team2Points}
                  onChange={(e) =>
                    setTeam2Points(
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                />
              </div>

            </div>

            <button
              onClick={saveMatchup}
              className="mt-5 rounded-lg bg-white px-6 py-2 font-semibold text-black hover:bg-gray-200"
            >
              Add Matchup
            </button>

          </div>

          <div className="mt-8">

            <h3 className="text-xl font-semibold">
              Week {selectedWeek} Matchups
            </h3>

            {filteredMatchups.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-gray-800 p-6 text-center">
                <p className="text-gray-400">
                  No matchups added yet.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {filteredMatchups.map((matchup) => (
                  <div
                    key={matchup.id}
                    className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-semibold">
                        {matchup.team1}
                      </p>

                      <p className="my-1 text-sm text-gray-500">
                        vs.
                      </p>

                      <p className="font-semibold">
                        {matchup.team2}
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <p className="text-xl font-bold">
                        {matchup.team1_points} –{" "}
                        {matchup.team2_points}
                      </p>

                      <button
                        onClick={() =>
                          deleteMatchup(matchup.id)
                        }
                        className="rounded-lg border border-red-800 px-4 py-2 text-sm text-red-400 hover:bg-red-950"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* =========================
            SEASON HISTORY EDITOR
        ========================= */}

        <section className="mt-16 pb-20">

          <h2 className="text-2xl font-bold">
            Season History Editor
          </h2>

          <p className="mt-2 text-gray-400">
            Edit each team's season record, final position,
            playoff result, and promotion or relegation.
          </p>

          {seasonHistory.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-gray-800 bg-gray-900 p-6">
              <p className="text-gray-400">
                No season history found.
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Add your season history records in Supabase first.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-5">

              {seasonHistory.map((history) => (
                <div
                  key={history.id}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-6"
                >

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {/* Season */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Season
                      </label>

                      <input
                        type="number"
                        value={history.season}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "season",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      />
                    </div>

                    {/* Team */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Team Name
                      </label>

                      <input
                        value={history.team_name || ""}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "team_name",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      />
                    </div>

                    {/* Division */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Division
                      </label>

                      <select
                        value={history.division || ""}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "division",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      >
                        <option value={DIVISION_1}>
                          Premier League Division 1
                        </option>

                        <option value={DIVISION_2}>
                          Division 2 Championship
                        </option>
                      </select>
                    </div>

                    {/* Wins */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Wins
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={history.wins}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "wins",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      />
                    </div>

                    {/* Losses */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Losses
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={history.losses}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "losses",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      />
                    </div>

                    {/* Final Position */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Final Position
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={history.final_position}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "final_position",
                            Number(e.target.value)
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      />
                    </div>

                    {/* Playoff Result */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Playoff Result
                      </label>

                      <input
                        value={history.playoff_result || ""}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "playoff_result",
                            e.target.value
                          )
                        }
                        placeholder="Example: Champion"
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      />
                    </div>

                    {/* Movement */}

                    <div>
                      <label className="mb-2 block text-sm text-gray-400">
                        Promotion / Relegation
                      </label>

                      <select
                        value={history.movement || ""}
                        onChange={(e) =>
                          updateHistory(
                            history.id,
                            "movement",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-white"
                      >
                        <option value="">
                          None
                        </option>

                        <option value="Promoted">
                          Promoted
                        </option>

                        <option value="Relegated">
                          Relegated
                        </option>
                      </select>
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      saveHistory(history)
                    }
                    className="mt-5 rounded-lg bg-white px-6 py-2 font-semibold text-black hover:bg-gray-200"
                  >
                    Save History
                  </button>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}