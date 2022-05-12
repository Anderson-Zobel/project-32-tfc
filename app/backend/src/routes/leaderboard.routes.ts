import { Router }from 'express';
import controllers from '../database/controllers';

const leaderboard = Router();

leaderboard.get(
  '/home',
  controllers.leaderboardController.getLeaderboard,
);

export default leaderboard;