import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it, before, after } from 'mocha';

import { app } from '../app';

import Users from '../database/models/Users';
import { users } from './mocks/user';

import Teams from '../database/models/Teams';
import { teams } from './mocks/team';

import Matches from '../database/models/Matches';
import { matches } from './mocks/matches'

import { teamId } from './mocks/teamId';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('1) Login Routes:', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(Users, 'findOne').resolves(users[0] as Users);
  });

  after(() => { 
    (Users.findOne as sinon.SinonStub).restore();
  });

  describe('1.1) POST para /login:', () => {
    it("1.1.1) erro msg: 'All fields must be filled', when 'email' no informed", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: '1234567',
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it("1.1.2) error msg: 'All fields must be filled', when 'password' not informed", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test@email.com'
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('1.1.3) invalid email', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[1].email,
        password: 'pass_test_123',
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.4) invalid password', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[0].email,
        password: users[1].password,
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.5) Email not registered', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'test@email.com',
        password: '123456789'
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.6) Incorrect password', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[0].email,
        password: 'invalidpass'
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.7) Login sucessfully.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: users[0].email,
        password: 'pass_test_123',
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.be.keys('id', 'username', 'role', 'email');
      expect(chaiHttpResponse.body.token).to.be.string;
    });
  });

  describe('1.2) Get Method em /login/validate:', () => {
    it('1.2.1) Token not informed', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
      .send();

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.error).to.be.equal('Token not found');
    });

    it('1.2.2) Invalid token', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set({ authorization: 'invalid_token' });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
});

describe('2.1) Teams Routes:', () => {
  let chaiHttpResponse: Response;

  describe('2.1.1) All teams:', () => {
    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(teams as unknown as Teams[]);
    });

    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });

    it('2.1.2) Returns a team list', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
    });
  });
});

describe('3) Teams Id Routes:', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon.stub(Teams, 'findOne').resolves(teamId as unknown as Teams);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('3.1) Returns a team by id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1')

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
    expect(chaiHttpResponse.body).to.be.equal(teamId);
  });

  it('3.2) Returns error if team id incorrect', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1')

    expect(chaiHttpResponse.status).to.be.equal(500);
    expect(chaiHttpResponse.body).to.be.equal({ error: 'Internal Server Error' });
  });
});

describe('4) Matches Routes:', () => {
  let chaiHttpResponse: Response;

  describe('4.1) All matches:', () => {
    before(async () => {
      sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]);
    });

    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });

    it('4.1.1) Returns a list with all matches', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches')

      expect(chaiHttpResponse.status).to.be.deep.equal(200);
      expect(chaiHttpResponse.body).to.be.equal(matches);
    });
    it('4.1.2) Returns error if incorrect listing for all matches', async () => {
      chaiHttpResponse = await chai.request(app).post('/matches')

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.be.equal({ error: 'Internal Server Error' });
    });
  });
})
describe('5) Leaderboard Routes:', () => {
  let chaiHttpResponse: Response;

  describe('5.1) All teams:', () => {
    before(async () => {
      sinon.stub(Teams, 'findAll').resolves(teams as unknown as Teams[]);
    });

    after(() => {
      (Teams.findAll as sinon.SinonStub).restore();
    });

    it('5.1.1) Returns Leaderboard.', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
    });
    it('5.1.2) Error in leadeboard return.', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

      expect(chaiHttpResponse.status).to.be.equal(500);
      expect(chaiHttpResponse.body).to.be.equal({ error: 'Internal Server Error' });
    });
  });
});