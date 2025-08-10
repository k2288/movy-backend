import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Network } from '../entities/network.entity';
import { CreateNetworkDto } from '../dto/create-network.dto';
import { UpdateNetworkDto } from '../dto/update-network.dto';
import { NetworkResponseDto } from '../dto/network-response.dto';

@Injectable()
export class NetworksService {
  constructor(
    @InjectRepository(Network)
    private readonly networkRepository: Repository<Network>,
  ) {}

  async create(createNetworkDto: CreateNetworkDto): Promise<NetworkResponseDto> {
    const network = this.networkRepository.create(createNetworkDto);
    const saved = await this.networkRepository.save(network);
    return this.map(saved);
  }

  async findAll(): Promise<NetworkResponseDto[]> {
    const list = await this.networkRepository.find({ 
      order: { name: 'ASC' },
      relations: ['imageUris']
    });
    return list.map(this.map);
  }

  async findOne(id: number): Promise<NetworkResponseDto> {
    const network = await this.networkRepository.findOne({ 
      where: { id },
      relations: ['imageUris']
    });
    if (!network) throw new NotFoundException(`شبکه با شناسه ${id} یافت نشد`);
    return this.map(network);
  }

  async findByIds(ids: number[]): Promise<Network[]> {
    if (!ids || ids.length === 0) return [];
    const networks = await this.networkRepository.find({ 
      where: { id: In(ids) },
      relations: ['imageUris']
    });
    if (networks.length !== ids.length) {
      const found = networks.map(n => n.id);
      const missing = ids.filter(id => !found.includes(id));
      throw new NotFoundException(`شبکه‌های با شناسه‌های ${missing.join(', ')} یافت نشدند`);
    }
    return networks;
  }

  async update(id: number, dto: UpdateNetworkDto): Promise<NetworkResponseDto> {
    const network = await this.networkRepository.findOne({ 
      where: { id },
      relations: ['imageUris']
    });
    if (!network) throw new NotFoundException(`شبکه با شناسه ${id} یافت نشد`);
    Object.assign(network, dto);
    const saved = await this.networkRepository.save(network);
    return this.map(saved);
  }

  async remove(id: number): Promise<void> {
    const network = await this.networkRepository.findOne({ where: { id } });
    if (!network) throw new NotFoundException(`شبکه با شناسه ${id} یافت نشد`);
    await this.networkRepository.softDelete(id);
  }

  private map = (n: Network): NetworkResponseDto => ({
    id: n.id,
    name: n.name,
    imageUris: n.imageUris ? n.imageUris.reduce((p, c, i) => {
      return [...p, { [c.type] : c.url }]
    },[]) : [],
  });
} 