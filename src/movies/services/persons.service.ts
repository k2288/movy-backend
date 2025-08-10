import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PersonResponseDto } from '../dto/person-response.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonResponseDto> {
    const person = this.personRepository.create(createPersonDto);
    const savedPerson = await this.personRepository.save(person);
    return this.mapToResponseDto(savedPerson);
  }

  async findAll(): Promise<PersonResponseDto[]> {
    const persons = await this.personRepository.find({
      order: { name: 'ASC' },
    });
    return persons.map(person => this.mapToResponseDto(person));
  }

  async findOne(id: number): Promise<PersonResponseDto> {
    const person = await this.personRepository.findOne({ where: { id } });
    
    if (!person) {
      throw new NotFoundException(`شخص با شناسه ${id} یافت نشد`);
    }

    return this.mapToResponseDto(person);
  }

  async findByIds(ids: number[]): Promise<Person[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    
    const persons = await this.personRepository.find({
      where: { id: In(ids) },
    });
    
    if (persons.length !== ids.length) {
      const foundIds = persons.map(person => person.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`اشخاص با شناسه‌های ${missingIds.join(', ')} یافت نشدند`);
    }
    
    return persons;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<PersonResponseDto> {
    const person = await this.personRepository.findOne({ where: { id } });
    
    if (!person) {
      throw new NotFoundException(`شخص با شناسه ${id} یافت نشد`);
    }

    Object.assign(person, updatePersonDto);
    const updatedPerson = await this.personRepository.save(person);
    return this.mapToResponseDto(updatedPerson);
  }

  async remove(id: number): Promise<void> {
    const person = await this.personRepository.findOne({ where: { id } });
    
    if (!person) {
      throw new NotFoundException(`شخص با شناسه ${id} یافت نشد`);
    }

    await this.personRepository.softDelete(id);
  }

  private mapToResponseDto(person: Person): PersonResponseDto {
    return {
      id: person.id,
      name: person.name,
      imageUris: person.imageUris || [],
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };
  }
} 