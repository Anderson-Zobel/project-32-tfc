import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction)
: Response => res.status(500).json({ error: 'something went wrong' });

export default errorHandler;