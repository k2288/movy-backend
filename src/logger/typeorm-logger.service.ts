import { IElasticService } from "src/elastic/interfaces/elastic-service.interface";
import { Logger, QueryRunner } from "typeorm"

export class TypeormLogger implements Logger {
    constructor(private elasticService: IElasticService) {
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if (process.env.DB_LOGGING === 'true')
            console.log({
                query, parameters
            })
    }
    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        console.log({
            error, query, parameters
        })
    }
    async logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        if (process.env.DB_SLOW_LOGGING === 'true') {
            await this.elasticService.logSlowQuery({ time, query, parameters: JSON.stringify(parameters) })
        }
    }
    logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        // throw new Error("Method not implemented.");
    }
    logMigration(message: string, queryRunner?: QueryRunner) {
        // throw new Error("Method not implemented.");
    }
    log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner) {
        // throw new Error("Method not implemented.");
    }


}