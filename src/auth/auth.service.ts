import { Injectable,ForbiddenException } from "@nestjs/common";
import { AuthDto } from './dto';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService{
    constructor(
        private prisma:PrismaService,
        private jwt:JwtService,
        private config: ConfigService,
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
            return this.signToken(user.id, user.email);
            
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

    async login(dto:AuthDto) {
        const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

      const pwMatches = await argon.verify(
        user.password,
        dto.password,
      );
      // if password incorrect throw exception
      if (!pwMatches)
        throw new ForbiddenException(
          'Credentials incorrect',
        );
        return this.signToken(user.id, user.email);
    }

    async signToken(
      userId: number,
      email: string,
    ): Promise<{ access_token: string }> {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');
  
      const token = await this.jwt.signAsync(
        payload,
        {
          expiresIn: '30m',
          secret: secret,
        },
      );
  
      return {
        access_token: token,
      };
    }
    

}