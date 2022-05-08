import * as express from 'express';
import loginRoute from './routes/login.routes'

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
    // this.app.use(loginRoutes)
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    // ...

    this.app.use(express.json());

    this.app.use(loginRoute);
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`APP listening on port ${PORT}`);      
    })
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
