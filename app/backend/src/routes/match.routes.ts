import { Router } from 'express';
import controllers from '../database/controllers';
import validations from '../middlewares'
const match = Router();

match.get(
  '/',
  controllers.matchController.findMatches
)

match.post(
  '/',
  validations.team,
  controllers.matchController.createMatches
);

match.patch(
  '/:id/finish',
  controllers.matchController.updateMatches,
)
export default match;