import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticService } from './elastic.service';
import { ELASTIC_SERVICE } from './interfaces/elastic-service.interface';

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: process.env.ELASTIC_HOST,
        auth: {
          username: process.env.ELATIC_USERNAME,
          password: process.env.ELASTIC_PASSWORD,
        },
      }),
    }),
  ],
  providers: [{
    provide: ELASTIC_SERVICE,
    useClass: ElasticService
  }],
  exports: [ELASTIC_SERVICE]
})
export class ElasticModule { }
