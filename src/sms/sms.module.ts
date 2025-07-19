import { Module } from '@nestjs/common';
import { SmsService } from './services/sms.service';
import { SMS_SERVICE } from './interfaces/sms-service.interface';
import { SmsirModule } from '@app/smsir';

@Module({
    imports: [SmsirModule],
    providers: [
        {
            provide: SMS_SERVICE,
            useClass: SmsService
        }
    ],
    exports: [SMS_SERVICE]
})
export class SmsModule {} 