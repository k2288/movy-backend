import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPayamsmsService } from '../interfaces/payamsms-service.interface';
import axios from 'axios';
import { PayamsmsErrorCode } from '../constants/error-codes';
import { PayamsmsBadRequestException } from '../exceptions/bad-request.exception';

@Injectable()
export class PayamsmsService implements IPayamsmsService {
    private readonly baseUrl: string;
    private readonly username: string;
    private readonly password: string;
    private readonly from: string;
    private readonly organization: string;
    constructor(private readonly configService: ConfigService) {
        this.baseUrl = 'https://www.payamsms.com/services/rest/index.php';
        this.username = process.env.PAYAM_SMS_USERNAME;
        this.password = process.env.PAYAM_SMS_PASSWORD;
        this.from = process.env.PAYAM_SMS_SENDER;
        this.organization = process.env.PAYAM_SMS_ORGANIZATION;
    }

    async sendOtp(mobile: string, message: string): Promise<void> {
        if (process.env.SMS_NODE_ENV === 'development') {
            console.log('Development mode - SMS not sent');
            console.log(`Mobile: ${mobile}, Message: ${message}`);
            return;
        }

        try {
            const response = await axios.post(`${this.baseUrl}`, {
                organization: this.organization,
                username: this.username,
                password: this.password,
                method: 'send',
                messages: [{
                    sender: this.from,
                    recipient: mobile,
                    body: message,
                    consumerId: 1
                }],
            });

            if (response.data.code !== 200) {
                throw new PayamsmsBadRequestException(
                    'Failed to send SMS',
                    PayamsmsErrorCode.SEND_FAILED,
                    response.data
                );
            }
        } catch (error) {
            if (error instanceof PayamsmsBadRequestException) {
                throw error;
            }
            throw new PayamsmsBadRequestException(
                'SMS service error',
                PayamsmsErrorCode.SERVICE_ERROR,
                error
            );
        }
    }

    async sendBulk(mobiles: string[], message: string): Promise<void> {
        if (process.env.SMS_NODE_ENV === 'development') {
            console.log('Development mode - Bulk SMS not sent');
            console.log(`Mobiles: ${mobiles.join(', ')}, Message: ${message}`);
            return;
        }

        try {
            const response = await axios.post(`${this.baseUrl}`, {
                organization: this.organization,
                username: this.username,
                password: this.password,
                method: 'sendBulk',
                messages: mobiles.map(mobile => ({
                    sender: this.from,
                    recipient: mobile,
                    body: message,
                    consumerId: 1
                })),
            });

            if (response.data.code !== 200) {
                throw new PayamsmsBadRequestException(
                    'Failed to send bulk SMS',
                    PayamsmsErrorCode.BULK_SEND_FAILED,
                    response.data
                );
            }
        } catch (error) {
            if (error instanceof PayamsmsBadRequestException) {
                throw error;
            }
            throw new PayamsmsBadRequestException(
                'SMS service error',
                PayamsmsErrorCode.SERVICE_ERROR,
                error
            );
        }
    }
} 