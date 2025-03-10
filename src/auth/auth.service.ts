import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { hash, verify } from "argon2";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../user/user.model";
import { signInDto } from "./dto/signIn.dto";

@Injectable({})
export class AuthService{
    constructor(
        @InjectModel(User)
        private userModel : typeof User
    ){}

    async signup(dto: AuthDto){
        try {
            const hashedPassword = await hash(dto.password);
            const newUser = await this.userModel.create({
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                hash: hashedPassword
            })

            return newUser;
        } catch (error) {
            console.log(error)
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new BadRequestException('Email is already in use.');
            }
            throw new BadRequestException('An error occurred during signup.');
        }
    }

    async signin(dto: signInDto){
        console.log('The request is ',dto)
        const user = await this.userModel.findOne({
            where:{
                email: dto.email
            },
            raw: true
        })

        if(!user){
            throw new ForbiddenException('User does not exist!')
        }

        const isPassValid = await verify(user.hash, dto.password);
        if(!isPassValid){
            throw new ForbiddenException('Password is incorrect')
        }

        return 'User SignedIn Successfully';
    }
}