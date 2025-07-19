import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
    constructor(
        response: string | Record<string, any>,
        status: number,
        public readonly errorCode: number,
        public readonly data?: any
    ) {
        super(
            {
                message: response,
                errorCode,
                data,
            },
            status,
        );
    }
} 