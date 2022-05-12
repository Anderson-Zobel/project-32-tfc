import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model {
  public id: number;
  public homeTeam: number;
  public awayTeam: number;
  public homeTeamGoals: number;
  public awayTeamGoals: number;
  public inProgress: boolean;

}

Matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataTypes.NUMBER,
  },

  homeTeam: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    }
  },

  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  awayTeam: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    }
  },

  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  inProgress: {
    type: DataTypes.INTEGER,    
  },

}, {
  underscored: true,
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
})