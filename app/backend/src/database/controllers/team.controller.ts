import { Request, Response, NextFunction  } from 'express';
import TeamService from '../services/team.service'

const findTeams = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await TeamService.findTeams();
    return res.status(200).json(teams);

  } catch (e) {
    return next(e);
  }
};

const findTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const team = await TeamService.findTeam({ id });

    return res.status(200).json(team);
  } catch (e) {
    return next(e);
  }
};

export default {
  findTeam,
  findTeams,
}