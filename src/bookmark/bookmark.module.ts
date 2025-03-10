import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Bookmark } from './bookmark.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Bookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService]
})
export class BookmarkModule {}
