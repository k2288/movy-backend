import { Client } from '@elastic/elasticsearch';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { LOG_GRPC_ERROR } from 'src/elastic/persist/indices';



@Catch()
export class GrpcExceptionsFilter implements ExceptionFilter {
    private _elasticClient: Client
    constructor() {
        this._elasticClient = new Client({
            node: process.env.ELASTIC_HOST,
            auth: {
                username: process.env.ELATIC_USERNAME,
                password: process.env.ELASTIC_PASSWORD,
            }
        })
    }

    async catch(exception: unknown, host: ArgumentsHost) {
        console.log(exception);
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        this._elasticClient.index({
            index: LOG_GRPC_ERROR,
            body: {
                timestamp: new Date().toISOString(),
                status: status,
                path: "card-grpc.service",
                message:  (exception as HttpException).message,
            }
        })
        return {
            hasError:true,
            status:status,
            message:(exception as HttpException).message
        }
      


    }



}   