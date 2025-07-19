import { Controller, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpLoggingInterceptor } from 'src/interceptors/http-logging.interceptor';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { DASHBOARD_SERVICE } from '../interfaces/dashboard-service.interface';
import { IDashboardService } from '../interfaces/dashboard-service.interface';

@Controller('dashboard')
@ApiTags('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseInterceptors(HttpLoggingInterceptor)
export class DashboardController {
    constructor(
        @Inject(DASHBOARD_SERVICE) private readonly dashboardService: IDashboardService
    ) {}
}