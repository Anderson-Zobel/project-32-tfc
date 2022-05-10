import { Router } from 'express';
import controllers from '../database/controllers';

const match = Router();

match.get(
  '/',
  controllers.matchController.findMatches
)

export default match;