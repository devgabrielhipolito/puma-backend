import { SequelizeOptions } from 'sequelize-typescript';

export function databaseConfig() {
  const sequelizeConfig: SequelizeOptions = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST ,
    port:  5438,
    username: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD ,
    database: process.env.DATABASE_NAME ,
  };

  return sequelizeConfig;
}
