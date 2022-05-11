import { Request, Response, NextFunction  } from 'express';
import MatchService from '../services/match.service'

const findMatches = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await MatchService.getAll();
    return res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
}

const createMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const create = await MatchService.createMatch(req.body);

    return res.status(201).json(create);
  } catch (e) {
    return next(e);
  }
}

const finishMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await MatchService.updateMatch(id)

    return res.status(200).json(`Match ${id} successfully finished`);
  } catch (e) {
    return next (e);
  }
 }

const updateCurrentMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchService.updateCurrentMatch({ id, homeTeamGoals, awayTeamGoals });
    return res.status(200).json({ message: 'update matches in progress'});

  } catch (e) {
    return next (e);
  }
}


export default {
  findMatches,
  createMatches,
  finishMatches,
  updateCurrentMatch,
}