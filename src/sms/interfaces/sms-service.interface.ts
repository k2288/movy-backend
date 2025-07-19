export const SMS_SERVICE = 'SMS SERVICE';

export interface ISmsService {
    sendOtp(mobile: string, otp: string): Promise<void>;
} 