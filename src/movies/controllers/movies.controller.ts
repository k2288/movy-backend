import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MoviesService } from '../services/movies.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { PaginatedMovieResponseDto } from '../dto/paginated-movie-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('movies')
@ApiTags('فیلم‌ها')
@UseInterceptors(HttpLoggingInterceptor)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد فیلم جدید' })
  @ApiResponse({ status: 201, description: 'فیلم با موفقیت ایجاد شد', type: MovieResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() createMovieDto: CreateMovieDto): Promise<MovieResponseDto> {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست فیلم‌ها (صفحه‌بندی شده)' })
  @ApiQuery({ name: 'page', required: false, description: 'شماره صفحه', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'تعداد آیتم در هر صفحه', example: 10 })
  @ApiResponse({ status: 200, description: 'لیست فیلم‌ها با موفقیت دریافت شد', type: PaginatedMovieResponseDto })
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedMovieResponseDto> {
    return this.moviesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات فیلم' })
  @ApiResponse({ status: 200, description: 'جزئیات فیلم با موفقیت دریافت شد', type: MovieResponseDto })
  @ApiResponse({ status: 404, description: 'فیلم یافت نشد' })
  findOne(@Param('id') id: string): Promise<MovieResponseDto> {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی فیلم' })
  @ApiResponse({ status: 200, description: 'فیلم با موفقیت بروزرسانی شد', type: MovieResponseDto })
  @ApiResponse({ status: 404, description: 'فیلم یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto): Promise<MovieResponseDto> {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف فیلم' })
  @ApiResponse({ status: 200, description: 'فیلم با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'فیلم یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.moviesService.remove(+id);
  }

  @Post('seed')
  @ApiOperation({ summary: 'ایجاد داده‌های نمونه فیلم‌ها' })
  @ApiResponse({ status: 201, description: 'داده‌های نمونه با موفقیت ایجاد شد' })
  async seed(): Promise<{ message: string }> {
    await this.moviesService.seed();
    return { message: 'داده‌های نمونه فیلم‌ها با موفقیت ایجاد شد' };
  }
} 