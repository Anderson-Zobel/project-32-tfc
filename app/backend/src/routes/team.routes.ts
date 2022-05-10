import { Router } from 'express';
import controllers from '../database/controllers';

const team = Router();

team.get('/',
  controllers.teamController.findTeams,
);

team.get('/:id',
  controllers.teamController.findTeam,
);

export default team;