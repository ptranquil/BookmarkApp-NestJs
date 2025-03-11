import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookmark } from './bookmark.model';
import { bookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(Bookmark)
        private bookmarkModel : typeof Bookmark
    ){}

    async getBookmark(){
        const bookmarks = await this.bookmarkModel.findAll({})
        return bookmarks;
    }

    async getBookmarkById(id: number){
        const bookmark = await this.bookmarkModel.findAll({
            where:{
                id
            },
            raw: true
        })
        if(bookmark){
            return bookmark;
        } else {
            throw new NotFoundException(`Bookmark with id ${id} does not exist`)
        }
    }

    async getBookmarkByUserId(id: number){
        try {
            const bookmark = await this.bookmarkModel.findAll({
                where:{
                    userId: id
                },
                raw: true
            })
            if(bookmark){
                return bookmark;
            } else {
                throw new NotFoundException(`Bookmark with User id ${id} does not exist`)
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestException('An error occured')
        }
    }

    async createBookmark(dto: bookmarkDto){
        try {
            const newBookMark = await this.bookmarkModel.create({
                title: dto.title,
                description: dto.description || "",
                link: dto.link,
                userId: dto.userId
            })

            return newBookMark;
        } catch (error) {
            if(error.name = "SequelizeForeignKeyConstraintError"){
                throw new BadRequestException('Invalid UserId')
            }
            throw new BadRequestException('An error occured')
        }
    }
}
