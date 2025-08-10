import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CastsService } from '../services/casts.service';
import { CreateCastDto } from '../dto/create-cast.dto';
import { UpdateCastDto } from '../dto/update-cast.dto';
import { CastResponseDto } from '../dto/cast-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('casts')
@ApiTags('بازیگران و عوامل')
@UseInterceptors(HttpLoggingInterceptor)
export class CastsController {
  constructor(private readonly castsService: CastsService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد بازیگر جدید' })
  @ApiResponse({ status: 201, description: 'بازیگر با موفقیت ایجاد شد', type: CastResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() createCastDto: CreateCastDto): Promise<CastResponseDto> {
    return this.castsService.create(createCastDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست بازیگران' })
  @ApiResponse({ status: 200, description: 'لیست بازیگران با موفقیت دریافت شد', type: [CastResponseDto] })
  findAll(): Promise<CastResponseDto[]> {
    return this.castsService.findAll();
  }

  @Get('movie/:movieId')
  @ApiOperation({ summary: 'دریافت بازیگران یک فیلم' })
  @ApiResponse({ status: 200, description: 'بازیگران فیلم با موفقیت دریافت شد', type: [CastResponseDto] })
  findByMovieId(@Param('movieId') movieId: string): Promise<CastResponseDto[]> {
    return this.castsService.findByMovieId(+movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات بازیگر' })
  @ApiResponse({ status: 200, description: 'جزئیات بازیگر با موفقیت دریافت شد', type: CastResponseDto })
  @ApiResponse({ status: 404, description: 'بازیگر یافت نشد' })
  findOne(@Param('id') id: string): Promise<CastResponseDto> {
    return this.castsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی بازیگر' })
  @ApiResponse({ status: 200, description: 'بازیگر با موفقیت بروزرسانی شد', type: CastResponseDto })
  @ApiResponse({ status: 404, description: 'بازیگر یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() updateCastDto: UpdateCastDto): Promise<CastResponseDto> {
    return this.castsService.update(+id, updateCastDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف بازیگر' })
  @ApiResponse({ status: 200, description: 'بازیگر با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'بازیگر یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.castsService.remove(+id);
  }
} 