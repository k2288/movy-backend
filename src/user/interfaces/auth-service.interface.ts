import { LoginUserDto } from "../dto/login-user.dto";
import { ILoggedInUser } from "./token-payload.interface";
import { RequestOtpDto } from "../dto/request-otp.dto";
import { VerifyOtpDto } from "../dto/verify-otp.dto";

export const AUTH_SERVICE = "AUTH SERVICE"
export interface IAuthService {
    validateUser(loginUserDto: LoginUserDto): Promise<any>;
    login(user: any): Promise<{ access_token: string }>;
    me(user: ILoggedInUser): Promise<any>;
    requestOtp(requestOtpDto: RequestOtpDto): Promise<{ message: string }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ access_token: string }>;
}