import { Injectable,ForbiddenException } from "@nestjs/common";
import { AuthDto } from './dto';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

@Injectable()
export class AuthService{
    constructor(
        private prisma:PrismaService,
    ) {}


    async register(dto: AuthDto) {
        
        const password = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
              data: {
                email: dto.email,
                password,
                nama:dto.nama,
                coins:0,
              },
            });
            return user;
            // return this.signToken(user.id, user.email);
            
          } catch (error) {
            if (
              error instanceof
              PrismaClientKnownRequestError
            ) {
              if (error.code === 'P2002') {
                throw new ForbiddenException(
                  'Credentials taken',
                );
              }
            }
            throw error;
          }
          
    }

    login() {
        return {msg:'ure logged in'};
    }

}