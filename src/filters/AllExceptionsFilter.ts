import { Client } from '@elastic/elasticsearch';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { ErrorCode } from 'src/common/constants/error-codes';
import { LOG_API, LOG_ERROR } from 'src/elastic/persist/indices';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private _elasticClient: Client
    constructor(private readonly i18n: I18nService) {
        this._elasticClient = new Client({
            node: process.env.ELASTIC_HOST,
            auth: {
                username: process.env.ELATIC_USERNAME,
                password: process.env.ELASTIC_PASSWORD,
            }
        })

    }

    async catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const { body, method, url } = request;
        console.dir(exception, { depth: null })
        let i18nMessage = null;
        let i18nErrorCode = null;
        if (exception instanceof I18nValidationException) {
            let errors = exception.errors;
            const messageList = []
            if (errors && errors.length > 0) {
                for (let error of errors) {
                    Object.keys(error.constraints).forEach(key => {
                        messageList.push(this.i18n.translate(error.constraints[key].split("|")[0], { args: { ...error, ...JSON.parse(error.constraints[key].split("|")[1]) } }))
                    })
                }
            }
            i18nMessage = messageList
            i18nErrorCode = ErrorCode.I18N_ERROR

        }

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        if (status === 500) {
            response.status(status).json({
                statusCode: status,
                tracking_code: request.body ? request.body["cms_tracking_id"] : "",
                errorCode: exception["response"] && exception["response"].errorCode ? exception["response"].errorCode : (exception["response"] && exception["response"]["response"] ? exception["response"]["response"].errorCode : null),
                // message: (exception as InternalServerErrorException).message
            });

            this._elasticClient.index(
                {
                    index: LOG_ERROR,
                    body: {
                        message: (exception as InternalServerErrorException).message,
                        _exception: JSON.stringify(exception),
                        response_data: (exception as AxiosError).response?.data,
                        // response:exception.response,
                        // request:request,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        statusCode: status,
                        tracking_code: request.body ? request.body["cms_tracking_id"] : ""

                    }
                }
            );

            this._elasticClient.index({
                index: LOG_API,
                body: {
                    timestamp: new Date().toISOString(),
                    headers: request.headers,
                    body: body,
                    method,
                    url,
                    status: status,
                    message: (exception as HttpException).message,
                    tracking_code: request.body ? request.body["cms_tracking_id"] : ""
                }
            })

            return;
        }

        this._elasticClient.index({
            index: LOG_API,
            body: {
                timestamp: new Date().toISOString(),
                headers: request.headers,
                body: body,
                method,
                url,
                status: status,
                message: (exception as HttpException).message,
                errorCode: exception["response"] && exception["response"].errorCode ? exception["response"].errorCode : (exception["response"] && exception["response"]["response"] ? exception["response"]["response"].errorCode : null),
                tracking_code: request.body ? request.body["cms_tracking_id"] : ""
            }
        })

        response.status(status).json({
            statusCode: status,
            errorCode: i18nErrorCode ? i18nErrorCode : (exception["response"] && exception["response"].errorCode ? exception["response"].errorCode : (exception["response"] && exception["response"].errorCode ? exception["response"].errorCode : (exception["response"] && exception["response"]["response"] ? exception["response"]["response"].errorCode : null))),
            message: i18nMessage ? i18nMessage : (exception["response"] ? exception["response"].message : (exception as HttpException).message),
            tracking_code: request.body ? request.body["cms_tracking_id"] : "",
            metadata: exception["response"] && exception["response"].data ? exception["response"].data : (exception["response"] && exception["response"].data ? exception["response"].data : (exception["response"] && exception["response"]["response"] ? exception["response"]["response"].data : null)),
        });


    }
}