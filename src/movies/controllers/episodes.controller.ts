import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EpisodesService } from '../services/episodes.service';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
import { EpisodeResponseDto } from '../dto/episode-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('episodes')
@ApiTags('قسمت‌ها')
@UseInterceptors(HttpLoggingInterceptor)
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد قسمت جدید' })
  @ApiResponse({ status: 201, description: 'قسمت با موفقیت ایجاد شد', type: EpisodeResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() dto: CreateEpisodeDto): Promise<EpisodeResponseDto> {
    return this.episodesService.create(dto);
  }

  @Get('series/:seriesId')
  @ApiOperation({ summary: 'دریافت قسمت‌های یک سریال' })
  @ApiResponse({ status: 200, description: 'قسمت‌ها با موفقیت دریافت شدند', type: [EpisodeResponseDto] })
  findBySeries(@Param('seriesId') seriesId: string): Promise<EpisodeResponseDto[]> {
    return this.episodesService.findBySeriesId(+seriesId);
  }

  @Get('season/:seasonId')
  @ApiOperation({ summary: 'دریافت قسمت‌های یک فصل' })
  @ApiResponse({ status: 200, description: 'قسمت‌ها با موفقیت دریافت شدند', type: [EpisodeResponseDto] })
  findBySeason(@Param('seasonId') seasonId: string): Promise<EpisodeResponseDto[]> {
    return this.episodesService.findBySeasonId(+seasonId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات قسمت' })
  @ApiResponse({ status: 200, description: 'جزئیات قسمت با موفقیت دریافت شد', type: EpisodeResponseDto })
  @ApiResponse({ status: 404, description: 'قسمت یافت نشد' })
  findOne(@Param('id') id: string): Promise<EpisodeResponseDto> {
    return this.episodesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی قسمت' })
  @ApiResponse({ status: 200, description: 'قسمت با موفقیت بروزرسانی شد', type: EpisodeResponseDto })
  @ApiResponse({ status: 404, description: 'قسمت یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() dto: UpdateEpisodeDto): Promise<EpisodeResponseDto> {
    return this.episodesService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف قسمت' })
  @ApiResponse({ status: 200, description: 'قسمت با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'قسمت یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.episodesService.remove(+id);
  }
} 