import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieDto, MovieDetailDto, MovieCreditsDto, MovieQueryDto } from './dto/movie.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@ApiTags('فیلم‌ها')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'دریافت لیست فیلم‌ها', description: 'دریافت لیست صفحه‌بندی شده فیلم‌ها' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'شماره صفحه' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'تعداد آیتم در هر صفحه' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'جستجو در عنوان' })
  @ApiQuery({ name: 'genre', required: false, type: Number, description: 'فیلتر بر اساس ژانر' })
  @ApiQuery({ name: 'year', required: false, type: Number, description: 'فیلتر بر اساس سال' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['popularity', 'voteAverage', 'releaseDate'], description: 'مرتب‌سازی' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'ترتیب مرتب‌سازی' })
  @ApiResponse({ status: 200, description: 'لیست فیلم‌ها', type: PaginatedResponseDto })
  async findAll(
    @Query() query: MovieQueryDto,
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<MovieDto>> {
    return this.movieService.findAll(query, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات فیلم', description: 'دریافت اطلاعات کامل یک فیلم' })
  @ApiParam({ name: 'id', description: 'شناسه فیلم', type: Number })
  @ApiResponse({ status: 200, description: 'جزئیات فیلم', type: MovieDetailDto })
  @ApiResponse({ status: 404, description: 'فیلم یافت نشد' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MovieDetailDto> {
    return this.movieService.findOne(id);
  }

  @Get(':id/credits')
  @ApiOperation({ summary: 'دریافت بازیگران فیلم', description: 'دریافت لیست بازیگران و عوامل فیلم' })
  @ApiParam({ name: 'id', description: 'شناسه فیلم', type: Number })
  @ApiResponse({ status: 200, description: 'بازیگران فیلم', type: MovieCreditsDto })
  @ApiResponse({ status: 404, description: 'فیلم یافت نشد' })
  async findCredits(@Param('id', ParseIntPipe) id: number): Promise<MovieCreditsDto> {
    return this.movieService.findCredits(id);
  }
} 