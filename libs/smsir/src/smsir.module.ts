import { Module } from '@nestjs/common';
import { SMSIR_SERVICE } from './interfaces/smsir-service.interface';
import { ConfigModule } from '@nestjs/config';
import { SmsirService } from './services/smsir.service';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: SMSIR_SERVICE,
            useClass: SmsirService
        }
    ],
    exports: [SMSIR_SERVICE]
})
export class SmsirModule {} 