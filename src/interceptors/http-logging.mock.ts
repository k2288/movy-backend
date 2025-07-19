import {
    NestInterceptor,
    ExecutionContext,
    CallHandler
  } from '@nestjs/common';
import { Observable } from 'rxjs';
export class MockHttpLoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle();
    }

}