const SLEEPER_API = "https://api.sleeper.app/v1";

export async function getLeague(leagueId: string) {
  const response = await fetch(
    `${SLEEPER_API}/league/${leagueId}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Sleeper league");
  }

  return response.json();
}

export async function getLeagueUsers(leagueId: string) {
  const response = await fetch(
    `${SLEEPER_API}/league/${leagueId}/users`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Sleeper league users");
  }

  return response.json();
}

export async function getLeagueRosters(leagueId: string) {
  const response = await fetch(
    `${SLEEPER_API}/league/${leagueId}/rosters`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Sleeper rosters");
  }

  return response.json();
}

export async function getMatchups(
  leagueId: string,
  week: number
) {
  const response = await fetch(
    `${SLEEPER_API}/league/${leagueId}/matchups/${week}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch matchups for week ${week}`
    );
  }

  return response.json();
}

export async function getAllMatchups(
  leagueId: string,
  weeks: number
) {
  const allMatchups = [];

  for (let week = 1; week <= weeks; week++) {
    const weekMatchups = await getMatchups(
      leagueId,
      week
    );

    allMatchups.push(
      ...weekMatchups.map((matchup: any) => ({
        ...matchup,
        week,
      }))
    );
  }

  return allMatchups;
}

export async function getPlayoffBracket(
  leagueId: string
) {
  const response = await fetch(
    `${SLEEPER_API}/league/${leagueId}/winners_bracket`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playoff bracket");
  }

  return response.json();
}