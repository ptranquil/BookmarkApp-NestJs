import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { bookmarkDto } from './dto/bookmark.dto';

@Controller('bookmark')
export class BookmarkController {

    constructor(private bookmarkService : BookmarkService){}

    @Get()
    getBookmarks(): any{
        return this.bookmarkService.getBookmark()
    }

    @Get(":id")
    getBookmarkBy(@Param() params: any){
        return this.bookmarkService.getBookmarkById(params.id)
    }

    @Get("user/:id")
    getBookmarkByUserId(@Param() params: any){
        return this.bookmarkService.getBookmarkByUserId(params.id)
    }

    @Post()
    createBookMark(@Body() dto: bookmarkDto){
        return this.bookmarkService.createBookmark(dto)
    }
}
