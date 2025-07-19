import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_MIGRATION_DATABASE,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    synchronize: false,
}); 