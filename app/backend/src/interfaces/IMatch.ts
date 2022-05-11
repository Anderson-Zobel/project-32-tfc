export interface IMatch {
  homeTeam: string;
  awayTeam: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchUpdate {
  id: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
}