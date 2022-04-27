import { DataTypes, Model} from 'sequelize';
import db from '.';

export default class Teams extends Model {
  public id: number;
  public team_name: string;
}

Teams.init({
    id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    team_name: {
      type: DataTypes.STRING,
    },

}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
})

