import { supabase } from "@/lib/supabase";

export type Matchup = {
  id?: number;
  season: number;
  week: number;
  division: string;
  team1: string;
  team2: string;
  team1Points: number;
  team2Points: number;
};

export type TeamRecord = {
  team: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winPercentage: number;
};

export type HeadToHeadRecord = {
  opponent: string;
  wins: number;
  losses: number;
  games: number;
  winPercentage: number;
};

const DIVISION_1 = "Premier League Division 1";
const DIVISION_2 = "Division 2 Championship";

const DIVISION_1_TEAMS = [
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

const DIVISION_2_TEAMS = [
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

/* =========================
   LOAD MATCHUPS
========================= */

async function getMatchups(
  division: string,
  weeks: number
): Promise<Matchup[]> {
  const { data, error } = await supabase
    .from("matchups")
    .select("*")
    .eq("season", 2026)
    .eq("division", division)
    .lte("week", weeks)
    .order("week", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("Error loading matchups:", error);
    return [];
  }

  return (data || []).map((matchup) => ({
    id: matchup.id,
    season: matchup.season,
    week: matchup.week,
    division: matchup.division,
    team1: matchup.team1,
    team2: matchup.team2,
    team1Points: Number(matchup.team1_points ?? 0),
    team2Points: Number(matchup.team2_points ?? 0),
  }));
}

/* =========================
   DIVISION 1
========================= */

export async function getDivision1Matchups(
  weeks: number
): Promise<Matchup[]> {
  return getMatchups(DIVISION_1, weeks);
}

/* =========================
   DIVISION 2
========================= */

export async function getDivision2Matchups(
  weeks: number
): Promise<Matchup[]> {
  return getMatchups(DIVISION_2, weeks);
}

/* =========================
   TEAM RECORDS
========================= */

function getTeamRecords(
  matchups: Matchup[],
  teams: string[]
): TeamRecord[] {
  const records: Record<string, TeamRecord> = {};

  for (const teamName of teams) {
    records[teamName] = {
      team: teamName,
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      winPercentage: 0,
    };
  }

  for (const matchup of matchups) {
    const team1 = records[matchup.team1];
    const team2 = records[matchup.team2];

    if (!team1 || !team2) {
      continue;
    }

    /*
      A 0–0 matchup is treated as an
      unplayed game.
    */
    if (
      matchup.team1Points === 0 &&
      matchup.team2Points === 0
    ) {
      continue;
    }

    team1.gamesPlayed++;
    team2.gamesPlayed++;

    if (matchup.team1Points > matchup.team2Points) {
      team1.wins++;
      team2.losses++;
    } else if (
      matchup.team2Points > matchup.team1Points
    ) {
      team2.wins++;
      team1.losses++;
    }
  }

  for (const record of Object.values(records)) {
    record.winPercentage =
      record.gamesPlayed > 0
        ? Number(
            (
              (record.wins / record.gamesPlayed) *
              100
            ).toFixed(1)
          )
        : 0;
  }

  return Object.values(records).sort(
    (a, b) =>
      b.wins - a.wins ||
      b.winPercentage - a.winPercentage
  );
}

export async function getDivision1TeamRecords(
  weeks: number
): Promise<TeamRecord[]> {
  const matchups = await getDivision1Matchups(weeks);

  return getTeamRecords(
    matchups,
    DIVISION_1_TEAMS
  );
}

export async function getDivision2TeamRecords(
  weeks: number
): Promise<TeamRecord[]> {
  const matchups = await getDivision2Matchups(weeks);

  return getTeamRecords(
    matchups,
    DIVISION_2_TEAMS
  );
}

/* =========================
   HEAD TO HEAD
========================= */

function getHeadToHead(
  teamName: string,
  matchups: Matchup[]
): HeadToHeadRecord[] {
  const records: Record<
    string,
    HeadToHeadRecord
  > = {};

  for (const matchup of matchups) {
    /*
      Ignore unplayed games.
    */
    if (
      matchup.team1Points === 0 &&
      matchup.team2Points === 0
    ) {
      continue;
    }

    let opponent: string | null = null;
    let teamWon = false;

    if (matchup.team1 === teamName) {
      opponent = matchup.team2;
      teamWon =
        matchup.team1Points >
        matchup.team2Points;
    } else if (matchup.team2 === teamName) {
      opponent = matchup.team1;
      teamWon =
        matchup.team2Points >
        matchup.team1Points;
    }

    if (!opponent) {
      continue;
    }

    if (!records[opponent]) {
      records[opponent] = {
        opponent,
        wins: 0,
        losses: 0,
        games: 0,
        winPercentage: 0,
      };
    }

    records[opponent].games++;

    if (teamWon) {
      records[opponent].wins++;
    } else {
      records[opponent].losses++;
    }
  }

  for (const record of Object.values(records)) {
    record.winPercentage =
      record.games > 0
        ? Number(
            (
              (record.wins / record.games) *
              100
            ).toFixed(1)
          )
        : 0;
  }

  return Object.values(records).sort(
    (a, b) => b.games - a.games
  );
}

export async function getDivision1HeadToHead(
  teamName: string,
  weeks: number
): Promise<HeadToHeadRecord[]> {
  const matchups =
    await getDivision1Matchups(weeks);

  return getHeadToHead(teamName, matchups);
}

export async function getDivision2HeadToHead(
  teamName: string,
  weeks: number
): Promise<HeadToHeadRecord[]> {
  const matchups =
    await getDivision2Matchups(weeks);

  return getHeadToHead(teamName, matchups);
}

/* =========================
   RIVALRY STATS
========================= */

function getRivalryStats(
  teamName: string,
  matchups: Matchup[]
) {
  const opponents: Record<
    string,
    {
      games: {
        week: number;
        won: boolean;
      }[];
    }
  > = {};

  for (const matchup of matchups) {
    if (
      matchup.team1Points === 0 &&
      matchup.team2Points === 0
    ) {
      continue;
    }

    let opponent: string | null = null;
    let won = false;

    if (matchup.team1 === teamName) {
      opponent = matchup.team2;
      won =
        matchup.team1Points >
        matchup.team2Points;
    } else if (matchup.team2 === teamName) {
      opponent = matchup.team1;
      won =
        matchup.team2Points >
        matchup.team1Points;
    }

    if (!opponent) {
      continue;
    }

    if (!opponents[opponent]) {
      opponents[opponent] = {
        games: [],
      };
    }

    opponents[opponent].games.push({
      week: matchup.week,
      won,
    });
  }

  let longestWinningStreak = 0;
  let longestLosingStreak = 0;

  for (const opponent of Object.values(opponents)) {
    const games = opponent.games.sort(
      (a, b) => a.week - b.week
    );

    let currentWins = 0;
    let currentLosses = 0;

    for (const game of games) {
      if (game.won) {
        currentWins++;
        currentLosses = 0;
      } else {
        currentLosses++;
        currentWins = 0;
      }

      longestWinningStreak = Math.max(
        longestWinningStreak,
        currentWins
      );

      longestLosingStreak = Math.max(
        longestLosingStreak,
        currentLosses
      );
    }
  }

  return {
    longestWinningStreak,
    longestLosingStreak,
  };
}

export async function getDivision1RivalryStats(
  teamName: string,
  weeks: number
) {
  const matchups =
    await getDivision1Matchups(weeks);

  return getRivalryStats(teamName, matchups);
}

export async function getDivision2RivalryStats(
  teamName: string,
  weeks: number
) {
  const matchups =
    await getDivision2Matchups(weeks);

  return getRivalryStats(teamName, matchups);
}