import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ImageUrisService } from '../services/image-uris.service';
import { CreateImageUriDto } from '../dto/create-image-uri.dto';
import { UpdateImageUriDto } from '../dto/update-image-uri.dto';
import { ImageUriResponseDto } from '../dto/image-uri-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('image-uris')
@ApiTags('تصاویر فیلم')
@UseInterceptors(HttpLoggingInterceptor)
export class ImageUrisController {
  constructor(private readonly imageUrisService: ImageUrisService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد تصویر جدید' })
  @ApiResponse({ status: 201, description: 'تصویر با موفقیت ایجاد شد', type: ImageUriResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() createImageUriDto: CreateImageUriDto & { movieId: number }): Promise<ImageUriResponseDto> {
    const { movieId, ...dto } = createImageUriDto;
    return this.imageUrisService.create(dto, movieId);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست تصاویر' })
  @ApiResponse({ status: 200, description: 'لیست تصاویر با موفقیت دریافت شد', type: [ImageUriResponseDto] })
  findAll(): Promise<ImageUriResponseDto[]> {
    return this.imageUrisService.findAll();
  }

  @Get('movie/:movieId')
  @ApiOperation({ summary: 'دریافت تصاویر یک فیلم' })
  @ApiResponse({ status: 200, description: 'تصاویر فیلم با موفقیت دریافت شد', type: [ImageUriResponseDto] })
  findByMovieId(@Param('movieId') movieId: string): Promise<ImageUriResponseDto[]> {
    return this.imageUrisService.findByMovieId(+movieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات تصویر' })
  @ApiResponse({ status: 200, description: 'جزئیات تصویر با موفقیت دریافت شد', type: ImageUriResponseDto })
  @ApiResponse({ status: 404, description: 'تصویر یافت نشد' })
  findOne(@Param('id') id: string): Promise<ImageUriResponseDto> {
    return this.imageUrisService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی تصویر' })
  @ApiResponse({ status: 200, description: 'تصویر با موفقیت بروزرسانی شد', type: ImageUriResponseDto })
  @ApiResponse({ status: 404, description: 'تصویر یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() updateImageUriDto: UpdateImageUriDto): Promise<ImageUriResponseDto> {
    return this.imageUrisService.update(+id, updateImageUriDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف تصویر' })
  @ApiResponse({ status: 200, description: 'تصویر با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'تصویر یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.imageUrisService.remove(+id);
  }
} 