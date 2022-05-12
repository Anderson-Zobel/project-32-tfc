import LeaderBoard from '../../interfaces/ILeaderboard';
import { IMatch } from '../../interfaces/IMatch';
import TeamsModel from '../models/Teams';
import MatchesModel from '../models/Matches';

class LeaderboardService {
  static matchesByHomeId = async (id: number) => (
    MatchesModel.findAll({ where: { homeTeam: id, inProgress: false } })
  );

  static showTotalGames = (matches: IMatch[]) => matches.length;

  static showTotalWins = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  static showTotalDraws = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  static showTotalLosses = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  static showGoalsFavor = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      count += match.homeTeamGoals;
    });

    return count;
  };

  static showGoalsOwn = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      count += match.awayTeamGoals;
    });

    return count;
  };

  static calculateTotalPoints = (wins: number, draws: number) => (wins * 3) + draws;

  static calculateGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

  static calculateEfficiency = (totalPoints: number, totalGames: number) => (
    +((totalPoints / (totalGames * 3)) * 100).toFixed(2)
  );

  static buildResult = (matches: IMatch[]) => {
    const resultTotalGames = this.showTotalGames(matches);
    const resultTotalVictories = this.showTotalWins(matches);
    const resultTotalDraws = this.showTotalDraws(matches);
    const resultTotalLosses = this.showTotalLosses(matches);
    const resultGoalsFavor = this.showGoalsFavor(matches);
    const resultGoalsOwn = this.showGoalsOwn(matches);
    const resultTotalPoints = this.calculateTotalPoints(resultTotalVictories, resultTotalDraws);
    const resultGoalsBalance = this.calculateGoalsBalance(resultGoalsFavor, resultGoalsOwn);
    const resultEfficiency = this.calculateEfficiency(resultTotalPoints, resultTotalGames);

    return {
      totalPoints: resultTotalPoints,
      totalGames: resultTotalGames,
      totalVictories: resultTotalVictories,
      totalDraws: resultTotalDraws,
      totalLosses: resultTotalLosses,
      goalsFavor: resultGoalsFavor,
      goalsOwn: resultGoalsOwn,
      goalsBalance: resultGoalsBalance,
      efficiency: resultEfficiency,
    };
  };

  static orderResult = (leaderboard: LeaderBoard[]) => (
    leaderboard.sort((team1, team2) => {
      if (team1.totalPoints < team2.totalPoints) return 1;
      if (team1.totalPoints > team2.totalPoints) return -1;

      if (team1.goalsBalance < team2.goalsBalance) return 1;
      if (team1.goalsBalance > team2.goalsBalance) return -1;

      if (team1.goalsFavor < team2.goalsFavor) return 1;
      if (team1.goalsFavor > team2.goalsFavor) return -1;

      if (team1.goalsOwn > team2.goalsOwn) return 1;
      if (team1.goalsOwn < team2.goalsOwn) return -1;

      return 0;
    })
  );

  static orderedResult = async () => {
    const teams = await TeamsModel.findAll();

    const leaderboard = await Promise.all(
      teams.map(async ({ id, teamName }) => {
        const matches = await this.matchesByHomeId(id);
        const result = this.buildResult(matches);
        return {
          name: teamName,
          ...result,
        };
      }),
    );

    this.orderResult(leaderboard);

    return leaderboard;
  };
}

export default LeaderboardService;