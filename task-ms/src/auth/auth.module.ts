import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [MongooseModule.forFeature([{name:User.name, schema:UserSchema}]), JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    })
],
    controllers: [AuthController],
    providers: [AuthService, {provide:APP_GUARD, useClass: AuthGuard},{provide:APP_GUARD, useClass:RolesGuard}],
})
export class AuthModule {}
