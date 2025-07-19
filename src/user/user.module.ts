import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { USER_SERVICE } from './interfaces/user-service.interface';
import { AUTH_SERVICE } from './interfaces/auth-service.interface';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SmsModule } from '../sms/sms.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.ACCESS_EXPIRATION_TIME },
            }),
        }),
        SmsModule,
    ],

    controllers: [AuthController],
    providers: [
        {
            provide: USER_SERVICE,
            useClass: UserService
        },
        {
            provide: AUTH_SERVICE,
            useClass: AuthService
        },
        JwtStrategy
    ],
    exports: [USER_SERVICE, AUTH_SERVICE],
})
export class UserModule {}
