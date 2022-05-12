import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/leaderboard.service';

  const getLeaderboard = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await LeaderBoardService.orderedResult();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };


export default {
  getLeaderboard,
}