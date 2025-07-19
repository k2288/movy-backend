import { ApiExcludeEndpoint } from "@nestjs/swagger";

export function HideSwaggerOnProd(): MethodDecorator{
    return ApiExcludeEndpoint(
        process.env.NODE_ENV=="production"
    )
}