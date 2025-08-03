import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SeriesService } from './series.service';
import { SeriesDto, SeriesDetailDto, SeriesQueryDto, SeasonDto } from './dto/series.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@ApiTags('سریال‌ها')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  @ApiOperation({ summary: 'دریافت لیست سریال‌ها', description: 'دریافت لیست صفحه‌بندی شده سریال‌ها' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'شماره صفحه' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'تعداد آیتم در هر صفحه' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'جستجو در عنوان' })
  @ApiQuery({ name: 'genre', required: false, type: Number, description: 'فیلتر بر اساس ژانر' })
  @ApiQuery({ name: 'year', required: false, type: Number, description: 'فیلتر بر اساس سال' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['popularity', 'voteAverage', 'firstAirDate'], description: 'مرتب‌سازی' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'ترتیب مرتب‌سازی' })
  @ApiResponse({ status: 200, description: 'لیست سریال‌ها', type: PaginatedResponseDto })
  async findAll(
    @Query() query: SeriesQueryDto,
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<SeriesDto>> {
    return this.seriesService.findAll(query, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات سریال', description: 'دریافت اطلاعات کامل یک سریال' })
  @ApiParam({ name: 'id', description: 'شناسه سریال', type: Number })
  @ApiResponse({ status: 200, description: 'جزئیات سریال', type: SeriesDetailDto })
  @ApiResponse({ status: 404, description: 'سریال یافت نشد' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<SeriesDetailDto> {
    return this.seriesService.findOne(id);
  }

  @Get(':id/seasons')
  @ApiOperation({ summary: 'دریافت فصل‌های سریال', description: 'دریافت لیست تمام فصل‌های یک سریال' })
  @ApiParam({ name: 'id', description: 'شناسه سریال', type: Number })
  @ApiResponse({ status: 200, description: 'فصل‌های سریال', type: [SeasonDto] })
  @ApiResponse({ status: 404, description: 'سریال یافت نشد' })
  async findSeasons(@Param('id', ParseIntPipe) id: number): Promise<SeasonDto[]> {
    return this.seriesService.findSeasons(id);
  }

  @Get(':id/season/:seasonNumber')
  @ApiOperation({ summary: 'دریافت فصل خاص', description: 'دریافت اطلاعات یک فصل خاص از سریال' })
  @ApiParam({ name: 'id', description: 'شناسه سریال', type: Number })
  @ApiParam({ name: 'seasonNumber', description: 'شماره فصل', type: Number })
  @ApiResponse({ status: 200, description: 'جزئیات فصل', type: SeasonDto })
  @ApiResponse({ status: 404, description: 'فصل یافت نشد' })
  async findSeason(
    @Param('id', ParseIntPipe) id: number,
    @Param('seasonNumber', ParseIntPipe) seasonNumber: number,
  ): Promise<SeasonDto> {
    return this.seriesService.findSeason(id, seasonNumber);
  }
} 