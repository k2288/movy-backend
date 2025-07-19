import { Injectable, Inject } from '@nestjs/common';
import { ISmsService } from '../interfaces/sms-service.interface';
import { ISmsirService, SMSIR_SERVICE } from '@app/smsir';

@Injectable()
export class SmsService implements ISmsService {
    constructor(
        @Inject(SMSIR_SERVICE) private readonly smsirService: ISmsirService
    ) {}

    async sendOtp(mobile: string, otp: string): Promise<void> {
        await this.smsirService.sendVerificationCode(mobile, otp);
    }
} 