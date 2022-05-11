import Teams from '../models/Teams';
import Matches from '../models/Matches';
import IMatch from '../../interfaces/IMatch'

const getAll = async () => (Matches.findAll({
  include: [
    {
      model: Teams,
      as: 'teamHome',
      attributes: ['teamName'],
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: ['teamName'],
    },
  ],
}));

const createMatch = async (matches: IMatch) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = matches;
  return Matches.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  });
};

const updateMatch = async (id: string) => {
  await Matches.update({ inProgress: false }, { where: { id }});
};

const teamById = async (id: string) => Teams.findByPk(id);

export default {
  getAll,
  createMatch,
  updateMatch,
  teamById,
}