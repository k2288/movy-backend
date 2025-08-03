import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { PersonDto, PersonDetailDto, PersonQueryDto } from './dto/person.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async findAll(query: PersonQueryDto, pagination: PaginationDto): Promise<PaginatedResponseDto<PersonDto>> {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const queryBuilder = this.personRepository
      .createQueryBuilder('person');

    // Apply search filter
    if (query.search) {
      queryBuilder.andWhere('person.name LIKE :search', { search: `%${query.search}%` });
    }

    // Apply sorting
    const sortBy = query.sortBy || 'popularity';
    const sortOrder = query.sortOrder || 'desc';
    
    switch (sortBy) {
      case 'name':
        queryBuilder.orderBy('person.name', sortOrder.toUpperCase() as 'ASC' | 'DESC');
        break;
      default:
        queryBuilder.orderBy('person.popularity', sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    const [people, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    const personDtos = people.map(person => this.mapToPersonDto(person));

    return {
      page,
      totalResults: total,
      totalPages,
      results: personDtos,
    };
  }

  async findOne(id: number): Promise<PersonDetailDto> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: ['casts'],
    });

    if (!person) {
      throw new Error('شخص یافت نشد');
    }

    return this.mapToPersonDetailDto(person);
  }

  private mapToPersonDto(person: Person): PersonDto {
    return {
      id: person.id,
      name: person.name,
      profilePath: person.profilePath,
      popularity: person.popularity,
    };
  }

  private mapToPersonDetailDto(person: Person): PersonDetailDto {
    return {
      ...this.mapToPersonDto(person),
      alsoKnownAs: person.alsoKnownAs,
      birthday: person.birthday,
      placeOfBirth: person.placeOfBirth,
      biography: person.biography,
      gender: person.gender,
      status: person.status,
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };
  }
} 