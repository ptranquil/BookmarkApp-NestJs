import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class bookmarkDto{
    @IsNotEmpty()
    @IsString()
    title: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    link: string

    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    userId: number
}