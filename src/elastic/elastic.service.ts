import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IElasticService } from './interfaces/elastic-service.interface';
import { LOG_API, SLOW_QUERY } from './persist/indices';
import { ILogInfo } from './interfaces/log-info.interface';

@Injectable()
export class ElasticService implements IElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async logSlowQuery(arg0: { time: number; query: string; parameters: string }): Promise<unknown> {
    return await this.elasticsearchService.index({
      index: SLOW_QUERY,
      body: { ...arg0, timestamp: new Date().toISOString() }
    });
  }

  async log_info(body: ILogInfo) {
    const result = await this.elasticsearchService.index({
      index: LOG_API,
      body: body,
    });
  }
}
