import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NetworksService } from '../services/networks.service';
import { CreateNetworkDto } from '../dto/create-network.dto';
import { UpdateNetworkDto } from '../dto/update-network.dto';
import { NetworkResponseDto } from '../dto/network-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('networks')
@ApiTags('شبکه‌ها')
@UseInterceptors(HttpLoggingInterceptor)
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد شبکه جدید' })
  @ApiResponse({ status: 201, description: 'شبکه با موفقیت ایجاد شد', type: NetworkResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() dto: CreateNetworkDto): Promise<NetworkResponseDto> {
    return this.networksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست شبکه‌ها' })
  @ApiResponse({ status: 200, description: 'لیست شبکه‌ها با موفقیت دریافت شد', type: [NetworkResponseDto] })
  findAll(): Promise<NetworkResponseDto[]> {
    return this.networksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات شبکه' })
  @ApiResponse({ status: 200, description: 'جزئیات شبکه با موفقیت دریافت شد', type: NetworkResponseDto })
  @ApiResponse({ status: 404, description: 'شبکه یافت نشد' })
  findOne(@Param('id') id: string): Promise<NetworkResponseDto> {
    return this.networksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی شبکه' })
  @ApiResponse({ status: 200, description: 'شبکه با موفقیت بروزرسانی شد', type: NetworkResponseDto })
  @ApiResponse({ status: 404, description: 'شبکه یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() dto: UpdateNetworkDto): Promise<NetworkResponseDto> {
    return this.networksService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف شبکه' })
  @ApiResponse({ status: 200, description: 'شبکه با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'شبکه یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.networksService.remove(+id);
  }
} 