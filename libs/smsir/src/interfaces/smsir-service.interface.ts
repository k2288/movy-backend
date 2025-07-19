export const SMSIR_SERVICE = 'SMSIR SERVICE';

export interface ISmsirService {
    sendVerificationCode(mobile: string, code: string): Promise<void>;
} 