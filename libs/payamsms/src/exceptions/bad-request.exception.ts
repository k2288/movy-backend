import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class PayamsmsBadRequestException extends BaseException {
    constructor(
        message: string | Record<string, any>,
        errorCode: number,
        data?: any
    ) {
        super(message, HttpStatus.BAD_REQUEST, errorCode, data);
    }
} 