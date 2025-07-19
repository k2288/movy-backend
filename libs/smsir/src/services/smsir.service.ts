import { Injectable } from '@nestjs/common';
import { ISmsirService } from '../interfaces/smsir-service.interface';
import axios from 'axios';
import { SmsirErrorCode } from '../constants/error-codes';
import { SmsirBadRequestException } from '../exceptions/bad-request.exception';
@Injectable()
export class SmsirService implements ISmsirService {
    private readonly baseUrl: string;
    private readonly apiKey: string;
    private readonly templateId: number;

    constructor() {
        this.baseUrl = 'https://api.sms.ir/v1/send';
        this.apiKey = process.env.SMSIR_API_KEY;
        this.templateId = Number(process.env.SMSIR_TEMPLATE_ID);
    }

    async sendVerificationCode(mobile: string, code: string): Promise<void> {
        if (process.env.SMS_NODE_ENV === 'development') {
            console.log('Development mode - SMS not sent');
            console.log(`Mobile: ${mobile}, Code: ${code}`);
            return;
        }

        try {
            const response = await axios.post(
                `${this.baseUrl}/verify`, 
                {
                    mobile,
                    templateId: this.templateId,
                    parameters: [
                        {
                            name: "CODE",
                            value: code
                        }
                    ]
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'X-API-KEY': this.apiKey,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status !== 1) {
                throw new SmsirBadRequestException(
                    'Failed to send verification code',
                    SmsirErrorCode.SEND_FAILED,
                    response.data
                );
            }
        } catch (error) {
            if (error instanceof SmsirBadRequestException) {
                throw error;
            }
            throw new SmsirBadRequestException(
                'SMS service error',
                SmsirErrorCode.SERVICE_ERROR,
                error
            );
        }
    }

} 