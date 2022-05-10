import Teams from '../models/Teams';
import Matches from '../models/Matches';

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

export default {
  getAll,
}