import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { PersonDto, PersonDetailDto, PersonQueryDto } from './dto/person.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@ApiTags('اشخاص')
@Controller('people')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @ApiOperation({ summary: 'دریافت لیست اشخاص', description: 'دریافت لیست صفحه‌بندی شده اشخاص' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'شماره صفحه' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'تعداد آیتم در هر صفحه' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'جستجو در نام' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['popularity', 'name'], description: 'مرتب‌سازی' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'ترتیب مرتب‌سازی' })
  @ApiResponse({ status: 200, description: 'لیست اشخاص', type: PaginatedResponseDto })
  async findAll(
    @Query() query: PersonQueryDto,
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<PersonDto>> {
    return this.personService.findAll(query, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'دریافت جزئیات شخص', description: 'دریافت اطلاعات کامل یک شخص' })
  @ApiParam({ name: 'id', description: 'شناسه شخص', type: Number })
  @ApiResponse({ status: 200, description: 'جزئیات شخص', type: PersonDetailDto })
  @ApiResponse({ status: 404, description: 'شخص یافت نشد' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PersonDetailDto> {
    return this.personService.findOne(id);
  }
} 