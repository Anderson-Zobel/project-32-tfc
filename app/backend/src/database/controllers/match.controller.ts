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

export default {
  findMatches,
}