export interface IMatch {
  id: number,
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchUpdate {
  id: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}