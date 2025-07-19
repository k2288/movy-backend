import { Module } from '@nestjs/common';
import { PAYAMSMS_SERVICE } from './interfaces/payamsms-service.interface';
import { PayamsmsService } from './services/payamsms.service';

@Module({
    providers: [
        {
            provide: PAYAMSMS_SERVICE,
            useClass: PayamsmsService
        }
    ],
    exports: [PAYAMSMS_SERVICE]
})
export class PayamsmsModule {} 