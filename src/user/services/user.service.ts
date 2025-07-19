import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { IUserService } from '../interfaces/user-service.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { RequestOtpDto } from '../dto/request-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PreRegisterDto } from '../dto/pre-register.dto';
import { ISmsService, SMS_SERVICE } from '../../sms/interfaces/sms-service.interface';
import { I18nService } from 'nestjs-i18n';
import { ErrorCode } from '../../common/constants/error-codes';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @Inject(SMS_SERVICE) private readonly smsService: ISmsService,
        private readonly i18n: I18nService,
    ) {
    }


    async getOne(arg0: { id: number; select: (keyof User)[]; }): Promise<User> {
        return this.userRepository.findOne({where: {id: arg0.id}, select: arg0.select});
    }


    async validateUser(loginUserDto: LoginUserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { mobile: loginUserDto.mobile }
        });

        if (!user) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.invalidCredentials'),
                errorCode: ErrorCode.INVALID_CREDENTIALS
            });
        }

        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

        if (!isPasswordValid) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.invalidCredentials'),
                errorCode: ErrorCode.INVALID_CREDENTIALS
            });
        }

        return user;
    }

    async findByMobile(mobile: string): Promise<User> {
        return this.userRepository.findOne({ where: { mobile } });
    }

    async requestOtp(requestOtpDto: RequestOtpDto): Promise<{ message: string }> {
        const user = await this.findByMobile(requestOtpDto.mobile);

        if (!user) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.userNotFound'),
                errorCode: ErrorCode.USER_NOT_FOUND
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await this.cacheManager.set(`otp:${requestOtpDto.mobile}`, otp, 120000);
        await this.smsService.sendOtp(requestOtpDto.mobile, otp);

        return {
            message: await this.i18n.translate('auth.success.otpSent')
        };
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<User> {
        const storedOtp = await this.cacheManager.get(`otp:${verifyOtpDto.mobile}`);

        if (!storedOtp) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.otpExpired'),
                errorCode: ErrorCode.OTP_EXPIRED
            });
        }

        if (storedOtp !== verifyOtpDto.otp) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.invalidOtp'),
                errorCode: ErrorCode.INVALID_OTP
            });
        }

        const user = await this.findByMobile(verifyOtpDto.mobile);

        if (!user) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.userNotFound'),
                errorCode: ErrorCode.USER_NOT_FOUND
            });
        }

        await this.cacheManager.del(`otp:${verifyOtpDto.mobile}`);
        return user;
    }

    async preRegister(preRegisterDto: PreRegisterDto): Promise<{ message: string }> {
        const existingUser = await this.userRepository.findOne({
            where: [
                { nationalCode: preRegisterDto.nationalCode },
                { mobile: preRegisterDto.mobile }
            ]
        });

        if (existingUser) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.userExists'),
                errorCode: ErrorCode.USER_EXISTS
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const currentTime = new Date().getTime();

        await this.cacheManager.set(
            `registration:${preRegisterDto.mobile}`,
            { ...preRegisterDto, otp, currentTime },
            300000
        );

        await this.smsService.sendOtp(preRegisterDto.mobile, otp);

        return {
            message: await this.i18n.translate('auth.success.otpSent')
        };
    }

    async verifyAndRegister(verifyOtpDto: VerifyOtpDto): Promise<User> {
        const registrationData = await this.cacheManager.get<{
            firstName: string;
            lastName: string;
            password: string;
            mobile: string;
            nationalCode: string;
            birthDate: string;
            otp: string;
            currentTime: number;
        }>(`registration:${verifyOtpDto.mobile}`);

        if (!registrationData) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.registrationExpired'),
                errorCode: ErrorCode.REGISTRATION_EXPIRED
            });
        }

        const currentTime = new Date().getTime();

        if (currentTime - registrationData.currentTime > 120000) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.otpExpired'),
                errorCode: ErrorCode.OTP_EXPIRED
            });
        }

        if (registrationData.otp !== verifyOtpDto.otp) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.invalidOtp'),
                errorCode: ErrorCode.INVALID_OTP
            });
        }

        const user = new User();
        user.firstName = registrationData.firstName;
        user.lastName = registrationData.lastName;
        user.mobile = registrationData.mobile;
        user.nationalCode = registrationData.nationalCode;
        user.birthDate = registrationData.birthDate;


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(registrationData.password, salt);

        const savedUser = await this.userRepository.save(user);
        await this.cacheManager.del(`registration:${verifyOtpDto.mobile}`);
        return savedUser;
    }

    async resendRegisterOtp(mobile: string): Promise<{ message: string }> {
        const registrationData = await this.cacheManager.get<{
            firstName: string;
            lastName: string;
            password: string;
            mobile: string;
            nationalCode: string;
            birthDate: string;
            otp: string;
        }>(`registration:${mobile}`);
        
        

        if (!registrationData) {
            throw new BadRequestException({
                message: await this.i18n.translate('auth.errors.registrationExpired'),
                errorCode: ErrorCode.REGISTRATION_EXPIRED
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const currentTime = new Date().getTime();

        await this.cacheManager.set(
            `registration:${mobile}`,
            { ...registrationData, otp ,currentTime },
            300000 // 5 minutes
        );

        await this.smsService.sendOtp(mobile, otp);

        return {
            message: await this.i18n.translate('auth.success.otpSent')
        };
    }

    async create(userData: { 
        firstName: string; 
        lastName: string; 
        mobile: string; 
        nationalCode: string; 
        birthDate: string;
    }): Promise<User> {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: [
                { nationalCode: userData.nationalCode },
                { mobile: userData.mobile }
            ]
        });

        if (existingUser) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.userExists'),
                errorCode: ErrorCode.USER_EXISTS
            });
        }

        // Create new user
        const user = new User();
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.mobile = userData.mobile;
        user.nationalCode = userData.nationalCode;
        user.birthDate = userData.birthDate;
        // Save the user
        return this.userRepository.save(user);
    }

    async findByNationalCode(nationalCode: string, select: (keyof User)[]): Promise<User> {
        const user = await this.userRepository.findOne({ 
            where: { nationalCode },
            select: select,
            cache: {
                id: `user:nationalCode:${nationalCode}:${select.join(',')}`,
                milliseconds: 900000 // 5 minutes
            }
        });

        if (!user) {
            throw new BadRequestException({
                message: this.i18n.translate('auth.errors.userNotFound'),
                errorCode: ErrorCode.USER_NOT_FOUND
            });
        }

        return user;
    }
} 