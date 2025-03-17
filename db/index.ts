import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Bookmark } from 'src/modules/bookmark/bookmark.model';
import { User } from 'src/modules/user/user.model';

// Ensure ConfigModule is initialized
ConfigModule.forRoot({ isGlobal: true });

export const dbModule = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    dialect: configService.get('DB_DIALECT'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    retryAttempts: 3,
    synchronize: true,
    models: [User, Bookmark],
  }),
});
