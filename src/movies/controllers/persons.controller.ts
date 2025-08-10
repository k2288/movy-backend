import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PersonsService } from '../services/persons.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonResponseDto } from '../dto/person-response.dto';
import { HttpLoggingInterceptor } from '../../interceptors/http-logging.interceptor';

@Controller('persons')
@ApiTags('اشخاص')
@UseInterceptors(HttpLoggingInterceptor)
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiOperation({ summary: 'ایجاد شخص جدید' })
  @ApiResponse({ status: 201, description: 'شخص با موفقیت ایجاد شد', type: PersonResponseDto })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  create(@Body() createPersonDto: CreatePersonDto): Promise<PersonResponseDto> {
    return this.personsService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'دریافت لیست اشخاص' })
  @ApiResponse({ status: 200, description: 'لیست اشخاص با موفقیت دریافت شد', type: [PersonResponseDto] })
  findAll(): Promise<PersonResponseDto[]> {
    return this.personsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات شخص' })
  @ApiResponse({ status: 200, description: 'جزئیات شخص با موفقیت دریافت شد', type: PersonResponseDto })
  @ApiResponse({ status: 404, description: 'شخص یافت نشد' })
  findOne(@Param('id') id: string): Promise<PersonResponseDto> {
    return this.personsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'بروزرسانی شخص' })
  @ApiResponse({ status: 200, description: 'شخص با موفقیت بروزرسانی شد', type: PersonResponseDto })
  @ApiResponse({ status: 404, description: 'شخص یافت نشد' })
  @ApiResponse({ status: 400, description: 'داده‌های ورودی نامعتبر است' })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<PersonResponseDto> {
    return this.personsService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'حذف شخص' })
  @ApiResponse({ status: 200, description: 'شخص با موفقیت حذف شد' })
  @ApiResponse({ status: 404, description: 'شخص یافت نشد' })
  remove(@Param('id') id: string): Promise<void> {
    return this.personsService.remove(+id);
  }
} 