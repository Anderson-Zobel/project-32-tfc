import { Request, Response, NextFunction } from 'express';
import MatchService from '../database/services/match.service';

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { homeTeam, awayTeam } = req.body
    const homeTeamValidation =  await MatchService.teamById(homeTeam);
    const awayTeamValidation =  await MatchService.teamById(awayTeam);

    if (homeTeam === awayTeam) { 
      return res.status(401).json({ message: 'It is not possible to create a match with two equal teams'});
    }

    if (!homeTeamValidation || !awayTeamValidation) {
      return res.status(404).json({ message: 'There is no team with such id!'});     
    }
    return next();

    }catch(e) {     
    return next(e);
  }
};

export default validate;