import { User } from "../entities/user.entity";
import { LoginUserDto } from '../dto/login-user.dto';
import { RequestOtpDto } from "../dto/request-otp.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";
import { PreRegisterDto } from "../dto/pre-register.dto";
import { ILoggedInUser } from "./token-payload.interface";

export const USER_SERVICE = 'USER SERVICE';
export interface IUserService {
    create(arg0: { 
        firstName: string; 
        lastName: string; 
        mobile: string; 
        nationalCode: string; 
    }): Promise<User>;
    getOne(arg0: { id: number; select: (keyof User)[]; }): Promise<User>;
    preRegister(preRegisterDto: PreRegisterDto): Promise<{ message: string }>;
    verifyAndRegister(verifyOtpDto: VerifyOtpDto): Promise<User>;
    validateUser(loginUserDto: LoginUserDto): Promise<User>;
    findByMobile(mobile: string): Promise<User>;
    requestOtp(requestOtpDto: RequestOtpDto): Promise<{ message: string }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<User>;
    resendRegisterOtp(mobile: string): Promise<{ message: string }>;
    findByNationalCode(nationalCode: string,select: (keyof User)[]): Promise<User>;
}

