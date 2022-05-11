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

const updateMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await MatchService.updateMatch(id)

    return res.status(200).json(`Match ${id} successfully finished`);
  } catch (e) {
    return next (e);
  }
 }

export default {
  findMatches,
  createMatches,
  updateMatches,
}