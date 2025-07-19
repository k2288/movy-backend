import { Body, Controller, Get, Inject, Post, Res, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HttpLoggingInterceptor } from "src/interceptors/http-logging.interceptor";
import { AUTH_SERVICE, IAuthService } from "../interfaces/auth-service.interface";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LoginUser } from "../decorators/login-user.decorator";
import { ILoggedInUser } from "../interfaces/token-payload.interface";
import { LoginUserDto } from "../dto/login-user.dto";
import { USER_SERVICE } from "../interfaces/user-service.interface";
import { IUserService } from "../interfaces/user-service.interface";
import { RequestOtpDto } from '../dto/request-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { PreRegisterDto } from '../dto/pre-register.dto';
import { Response } from "express";

@Controller("auth")
@ApiTags("auth")
@ApiBearerAuth()
@UseInterceptors(HttpLoggingInterceptor)
export class AuthController {
    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
        @Inject(USER_SERVICE) private readonly userService: IUserService
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Login with mobile and password' })
    async login(@Body() loginUserDto: LoginUserDto,@Res({ passthrough: true }) res:Response) {
        const user = await this.authService.validateUser(loginUserDto);
        const { access_token } = await this.authService.login(user);
        res.cookie('access_token', access_token, {  maxAge: +process.env.COOKIE_EXPIRATION_TIME*1000 });
        return { message: 'Login successful' ,token:access_token };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({ summary: 'پروفایل' })
    getProfile(@LoginUser() user: ILoggedInUser) {
        return this.authService.me(user)
    }

    @Post('otp/request')
    @ApiOperation({ summary: 'Request OTP code' })
    async requestOtp(@Body() requestOtpDto: RequestOtpDto) {
        return this.authService.requestOtp(requestOtpDto);
    }

    @Post('otp/verify')
    @ApiOperation({ summary: 'Verify OTP and login' })
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.authService.verifyOtp(verifyOtpDto);
    }

    @Post('pre-register')
    @ApiOperation({ summary: 'Start registration process and send OTP' })
    async preRegister(@Body() preRegisterDto: PreRegisterDto) {
        return this.userService.preRegister(preRegisterDto);
    }

    @Post('verify-register')
    @ApiOperation({ summary: 'Verify OTP and complete registration' })
    async verifyAndRegister(@Body() verifyOtpDto: VerifyOtpDto) {
        const user = await this.userService.verifyAndRegister(verifyOtpDto);
        const { password, createdAt, updatedAt, deletedAt, ...result } = user;
        return result;
    }

    @Post('resend-register-otp')
    @ApiOperation({ summary: 'Resend registration OTP' })
    async resendRegisterOtp(@Body() requestOtpDto: RequestOtpDto) {
        return this.userService.resendRegisterOtp(requestOtpDto.mobile);
    }
}
