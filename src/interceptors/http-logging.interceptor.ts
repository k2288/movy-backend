import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { map, Observable } from 'rxjs';
import { ELASTIC_SERVICE, IElasticService } from 'src/elastic/interfaces/elastic-service.interface';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(@Inject(ELASTIC_SERVICE) private _elasticService: IElasticService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { body, method, url } = request;
    if (!method)
      return next.handle();
    request.body["cms_tracking_id"] = randomUUID()
    this._elasticService.log_info(
      {
        timestamp: new Date().toISOString(),
        ip_addresss: request.headers['x-forwarded-for'],
        headers: request.headers,
        request_body:JSON.stringify(body),
        method,
        url,
        tracking_code: request.body["cms_tracking_id"]
      }
    );
    if (method === `GET`) {
      return next.handle().pipe(
        map((data) => {
          if (process.env.GET_HTTP_RESPONSE_LOG)
            this._elasticService.log_info(
              {
                timestamp: new Date().toISOString(),
                headers: request.headers,
                request_body:JSON.stringify(body),
                ip_addresss: request.headers['x-forwarded-for'],
                method,
                url,
                _response: JSON.stringify({
                  tracking_code: request.body["cms_tracking_id"],
                  result: data,
                }),
                statusCode: context.switchToHttp().getResponse().statusCode,
                tracking_code: request.body["cms_tracking_id"]
              }
            );
          return data
        })
      );

    }
    return next.handle().pipe(
      map((data) => {
        this._elasticService.log_info(
          {
            timestamp: new Date().toISOString(),
            ip_addresss: request.headers['x-forwarded-for'],
            headers: request.headers,
            request_body:JSON.stringify(body),
            method,
            url,
            _response: JSON.stringify({
              tracking_code: request.body["cms_tracking_id"],
              result: data,
            }),
            statusCode: context.switchToHttp().getResponse().statusCode,
            tracking_code: request.body["cms_tracking_id"]
          }
        );
        return {
          tracking_code: request.body["cms_tracking_id"],
          result: data,
        }
      })
    );
  }
}
