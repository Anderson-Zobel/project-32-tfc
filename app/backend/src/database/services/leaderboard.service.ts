import LeaderBoard from '../../interfaces/ILeaderboard';
import { IMatch } from '../../interfaces/IMatch';
import TeamsModel from '../models/Teams';
import Matches from '../models/Matches';


  const matchesById = async (id: number) => (
    Matches.findAll({ where: { homeTeam: id, inProgress: false } })
  );

  const allGames = (matches: IMatch[]) => matches.length;

  const allWins = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  const allDraws = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals === match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  const allLoses = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        count += 1;
      }
    });

    return count;
  };

  const positiveGoals = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      count += match.homeTeamGoals;
    });

    return count;
  };

  const goalsOwn = (matches: IMatch[]) => {
    let count = 0;

    matches.forEach((match) => {
      count += match.awayTeamGoals;
    });

    return count;
  };

  const totalPoints = (wins: number, draws: number) => (wins * 3) + draws;

  const goalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

  const eff = (totalPoints: number, allGames: number) => (
    +((totalPoints / (allGames * 3)) * 100).toFixed(2)
  );

  const setupResult = (matches: IMatch[]) => {
    const resultAllGames = allGames(matches);
    const totalVictories = allWins(matches);
    const totalDraws = allDraws(matches);
    const totalLosses = allLoses(matches);
    const totalGoals = positiveGoals(matches);
    const totalGoasOwn = goalsOwn(matches);
    const totalPointsResult = totalPoints(totalVictories, totalDraws);
    const goalsBalanceResult = goalsBalance(totalGoals, totalGoasOwn);
    const efficiency = eff(totalPointsResult, resultAllGames);

    return {
      totalPoints: totalPointsResult,
      totalGames: resultAllGames,
      totalVictories: totalVictories,
      totalDraws: totalDraws,
      totalLosses: totalLosses,
      goalsFavor: totalGoals,
      goalsOwn: totalGoasOwn,
      goalsBalance: goalsBalanceResult,
      efficiency: efficiency,
    };
  };

  const filterResult = (leaderboard: LeaderBoard[]) => (
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

  const filteredResult = async () => {
    const teams = await TeamsModel.findAll();

    const leaderboard = await Promise.all(
      teams.map(async ({ id, teamName }) => {
        const matches = await matchesById(id);
        const result = setupResult(matches);
        return {
          name: teamName,
          ...result,
        };
      }),
    );

    filterResult(leaderboard);

    return leaderboard;
  };


export default {
  filteredResult,
}