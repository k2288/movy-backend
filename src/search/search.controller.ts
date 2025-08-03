import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchQueryDto, SearchResultDto } from './dto/search.dto';

@ApiTags('جستجو')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'جستجو', description: 'جستجو در فیلم‌ها، سریال‌ها و اشخاص' })
  @ApiQuery({ name: 'q', required: true, type: String, description: 'کلمه کلیدی جستجو' })
  @ApiQuery({ name: 'type', required: false, enum: ['movie', 'series', 'person'], description: 'نوع جستجو' })
  @ApiResponse({ status: 200, description: 'نتایج جستجو', type: [SearchResultDto] })
  async search(@Query() query: SearchQueryDto): Promise<SearchResultDto[]> {
    return this.searchService.search(query);
  }
} 