import { Injectable, Inject } from '@nestjs/common';
import { IDashboardService } from '../interfaces/dashboard-service.interface';
import { ILoggedInUser } from 'src/user/interfaces/token-payload.interface';



@Injectable()
export class DashboardService implements IDashboardService {
    constructor(

    ) { }

} 