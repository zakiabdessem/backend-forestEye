import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Req,
  Get,
} from '@nestjs/common';
import { UserCreateDto } from './dtos/user-create.dto';
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import cookieConfig from './../../config/cookie';
import { UserService } from './user.service';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import { publicEncrypt, privateDecrypt } from 'crypto';

@Controller('user')
export class UserController {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: UserCreateDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.loginUser(email, password);

      if (!user)
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid credentials' });

      const token = await sign(user._id.toString(), process.env.SECRET);

      //hash user with node rsa
      const publicKey = fs.readFileSync('./public.pem', 'utf8');
      const privateKey = fs.readFileSync('./private.pem', 'utf8');
      const encrypted = publicEncrypt(
        publicKey,
        Buffer.from(user._id.toString()),
      );
      const decrypted = privateDecrypt(privateKey, encrypted);
      console.log('decrypted: ', decrypted.toString());

      return res
        .cookie('jwt', token, cookieConfig())
        .status(HttpStatus.OK)
        .json({ message: 'Auth Success', user, token });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Authentication failed',
      });
    }
  }

  @Get('verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    try {
      const decoded = req.decodedToken;

      const User = await this.userService.findOneById(decoded);
      if (!User) return res.status(404).json({ auth: false }); // if there is no matched user

      return res.status(HttpStatus.OK).json({ message: 'Auth Success' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Authentication failed',
      });
    }
  }

  @Post('auth/google')
  async googleAuth(
    @Body() { token }: { token: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload?.email_verified) throw new Error('Email not verified');

      const user = await this.userService.findOneByEmail(payload.email);

      if (!user)
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Invalid credentials' });

      const tokenCookie = await sign(user._id.toString(), process.env.SECRET);

      return res
        .cookie('jwt', tokenCookie, cookieConfig())
        .status(HttpStatus.OK)
        .json({ message: 'Auth Success' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Authentication failed',
      });
    }
  }
}
