import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudiosService } from '../services/studios.service';
import { CreateStudioDto } from '../dto/create-studio.dto';
import { UpdateStudioDto } from '../dto/update-studio.dto';
import { StudioResponseDto } from '../dto/studio-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('studios')
@ApiTags('استودیوها')
@UseInterceptors(HttpLoggingInterceptor)
export class StudiosController {
  constructor(private readonly studiosService: StudiosService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد استودیو جدید' })
  @ApiResponse({ status: 201, description: 'استودیو با موفقیت ایجاد شد', type: StudioResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() createStudioDto: CreateStudioDto): Promise<StudioResponseDto> {
    return this.studiosService.create(createStudioDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست استودیوها' })
  @ApiResponse({ status: 200, description: 'لیست استودیوها با موفقیت دریافت شد', type: [StudioResponseDto] })
  findAll(): Promise<StudioResponseDto[]> {
    return this.studiosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات استودیو' })
  @ApiResponse({ status: 200, description: 'جزئیات استودیو با موفقیت دریافت شد', type: StudioResponseDto })
  @ApiResponse({ status: 404, description: 'استودیو یافت نشد' })
  findOne(@Param('id') id: string): Promise<StudioResponseDto> {
    return this.studiosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی استودیو' })
  @ApiResponse({ status: 200, description: 'استودیو با موفقیت بروزرسانی شد', type: StudioResponseDto })
  @ApiResponse({ status: 404, description: 'استودیو یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() updateStudioDto: UpdateStudioDto): Promise<StudioResponseDto> {
    return this.studiosService.update(+id, updateStudioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف استودیو' })
  @ApiResponse({ status: 200, description: 'استودیو با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'استودیو یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.studiosService.remove(+id);
  }
} 