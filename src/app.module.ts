import { Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { dbModule } from 'db';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [dbModule, AuthModule, UserModule, BookmarkModule],
  controllers: [],
  providers: [],
})

export class AppModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    console.log('Synchronizing database...');
    await this.sequelize.sync({alter: true, logging: false});
    console.log('Database synchronized');
  }
}
