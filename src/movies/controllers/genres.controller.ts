import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenresService } from '../services/genres.service';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { GenreResponseDto } from '../dto/genre-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('genres')
@ApiTags('ژانرها')
@UseInterceptors(HttpLoggingInterceptor)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد ژانر جدید' })
  @ApiResponse({ status: 201, description: 'ژانر با موفقیت ایجاد شد', type: GenreResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() createGenreDto: CreateGenreDto): Promise<GenreResponseDto> {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست ژانرها' })
  @ApiResponse({ status: 200, description: 'لیست ژانرها با موفقیت دریافت شد', type: [GenreResponseDto] })
  findAll(): Promise<GenreResponseDto[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات ژانر' })
  @ApiResponse({ status: 200, description: 'جزئیات ژانر با موفقیت دریافت شد', type: GenreResponseDto })
  @ApiResponse({ status: 404, description: 'ژانر یافت نشد' })
  findOne(@Param('id') id: string): Promise<GenreResponseDto> {
    return this.genresService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی ژانر' })
  @ApiResponse({ status: 200, description: 'ژانر با موفقیت بروزرسانی شد', type: GenreResponseDto })
  @ApiResponse({ status: 404, description: 'ژانر یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto): Promise<GenreResponseDto> {
    return this.genresService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف ژانر' })
  @ApiResponse({ status: 200, description: 'ژانر با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'ژانر یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.genresService.remove(+id);
  }
} 