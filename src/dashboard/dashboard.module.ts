import { Module } from '@nestjs/common';
import { DashboardController } from './controllers/dashboard.controller';
import { DashboardService } from './services/dashboard.service';
import { DASHBOARD_SERVICE } from './interfaces/dashboard-service.interface';

import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        UserModule,
    ],
    controllers: [DashboardController],
    providers: [
        {
            provide: DASHBOARD_SERVICE,
            useClass: DashboardService
        }
    ],
    exports: [DASHBOARD_SERVICE]
})
export class DashboardModule {} 