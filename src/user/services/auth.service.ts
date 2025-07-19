import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../interfaces/auth-service.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { IUserService, USER_SERVICE } from '../interfaces/user-service.interface';
import { ILoggedInUser } from '../interfaces/token-payload.interface';
import { RequestOtpDto } from '../dto/request-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(USER_SERVICE) private readonly userService: IUserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userService.validateUser(loginUserDto);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload :ILoggedInUser = {
            id: user.id,
            mobile: user.mobile,
            nationalCode: user.nationalCode,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async me(user: ILoggedInUser) {
        return user;
    }

    async requestOtp(requestOtpDto: RequestOtpDto): Promise<{ message: string }> {
        return this.userService.requestOtp(requestOtpDto);
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ access_token: string }> {
        const user = await this.userService.verifyOtp(verifyOtpDto);
        
        const payload :ILoggedInUser = { 
            id: user.id, 
            mobile: user.mobile,
            nationalCode: user.nationalCode,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}