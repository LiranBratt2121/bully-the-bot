const teamsApiPath = 'https://www.thebluealliance.com/api/v3/teams';

export async function randomTeamName() {
    const teamPage = Math.floor(Math.random() * 18) + 1;

    const headers = new Headers();
    headers.append('X-TBA-Auth-Key', process.env.TBA_API_KEY!);

    const teams: any[] = await fetch(`${teamsApiPath}/${teamPage}`, { headers }).then(res => res.json());

    return teams[Math.floor(Math.random() * teams.length)].nickname;
}