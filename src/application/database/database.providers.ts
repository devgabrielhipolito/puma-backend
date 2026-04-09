import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './config/database.config';
import { User } from './models';
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public sequelize: Sequelize;
  public sequelizeReder: Sequelize;

  constructor() {
    const config = databaseConfig();

    this.sequelize = new Sequelize({
      ...config,

      models: [User],
      pool: { max: 20 },
      define: {
        underscored: true,
        defaultScope: {
          attributes: [],
        },
      },
    });
  }

  async onModuleInit() {
    await this.sequelize.authenticate();
    await this.sequelize.sync();
  }

  async onModuleDestroy() {
    await this.sequelize.close();
  }
  getConnection() {
    return this.sequelize;
  }
}
