export const PAYAMSMS_SERVICE = 'PAYAMSMS SERVICE';

export interface IPayamsmsService {
    sendOtp(mobile: string, message: string): Promise<void>;
    sendBulk(mobiles: string[], message: string): Promise<void>;
} 