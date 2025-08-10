import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeasonsService } from '../services/seasons.service';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { SeasonResponseDto } from '../dto/season-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('seasons')
@ApiTags('فصل‌ها')
@UseInterceptors(HttpLoggingInterceptor)
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد فصل جدید' })
  @ApiResponse({ status: 201, description: 'فصل با موفقیت ایجاد شد', type: SeasonResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() dto: CreateSeasonDto): Promise<SeasonResponseDto> {
    return this.seasonsService.create(dto);
  }

  @Get('series/:seriesId')
  @ApiOperation({ summary: 'دریافت فصل‌های یک سریال' })
  @ApiResponse({ status: 200, description: 'فصل‌ها با موفقیت دریافت شدند', type: [SeasonResponseDto] })
  findBySeries(@Param('seriesId') seriesId: string): Promise<SeasonResponseDto[]> {
    return this.seasonsService.findBySeriesId(+seriesId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات فصل' })
  @ApiResponse({ status: 200, description: 'جزئیات فصل با موفقیت دریافت شد', type: SeasonResponseDto })
  @ApiResponse({ status: 404, description: 'فصل یافت نشد' })
  findOne(@Param('id') id: string): Promise<SeasonResponseDto> {
    return this.seasonsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی فصل' })
  @ApiResponse({ status: 200, description: 'فصل با موفقیت بروزرسانی شد', type: SeasonResponseDto })
  @ApiResponse({ status: 404, description: 'فصل یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() dto: UpdateSeasonDto): Promise<SeasonResponseDto> {
    return this.seasonsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف فصل' })
  @ApiResponse({ status: 200, description: 'فصل با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'فصل یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.seasonsService.remove(+id);
  }
} 