import Teams from '../models/Teams';
import { ITeam, ITeams } from '../../interfaces/ITeam'

const findTeams = async (): Promise<ITeams[]> => {
  const teams = await Teams.findAll();

  return teams;
};

const findTeam = async (filter: ITeam): Promise<ITeam> => {
  const team = await Teams.findOne({
    where: { ...filter }
  });

  if (!team) throw new Error('unexpected error');
  const publicTeam = team.get();
  return publicTeam;
}

export default {
  findTeams,
  findTeam,
}