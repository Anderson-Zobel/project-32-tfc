import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Users extends Model {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public role: string;
}

Users.init({
  id: {
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    type: DataTypes.NUMBER,
  },
  
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },

  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING,
  }

}, {
  underscored: true,
  sequelize: db,
  tableName: 'users',
  timestamps: false,  
})