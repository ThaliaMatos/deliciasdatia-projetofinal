// src/config/database.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('deliciasdatia', 'postgres', 'postgres', {
  host: 'localhost:5433',
  dialect: 'postgres',
});
