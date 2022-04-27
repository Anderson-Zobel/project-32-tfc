import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams'

export default class Matches extends Model {
  public id: number;
  public home_team: string;
  public home_team_goals: number;
  public away_team: number;
  public awat_team_goals: number;
  public in_progress: number; 
}

Matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataTypes.NUMBER,
  },

  home_team: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    }
  },

  home_team_goals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  away_team: {
    type: DataTypes.INTEGER,
    references: {
      model: Teams,
      key: 'id',
    }
  },

  awat_team_goals: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },

  in_progress: {
    type: DataTypes.INTEGER,    
  },

}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Matches.hasOne(Teams, {
  foreignKey: 'home_team',
  as: 'home_team',
});

Matches.hasOne(Teams, {
  foreignKey: 'away_team',
  as: 'away_team',
})