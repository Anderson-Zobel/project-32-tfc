import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, _next: NextFunction)
: Response => res.status(500).json({ err: 'something went wrong' });

export default errorHandler;