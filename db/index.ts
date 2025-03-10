import { SequelizeModule } from '@nestjs/sequelize';
import { Bookmark } from 'src/bookmark/bookmark.model';
import { User } from 'src/user/user.model';

export const dbModule = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs',
  retryAttempts: 3,
  synchronize: true, // This should be enough
  // logging: console.log, // Enable SQL query logging
  models: [User, Bookmark],
});
