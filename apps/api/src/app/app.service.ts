import { Injectable } from '@nestjs/common';
import { AlertEntity } from './entities/alert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AlertEntity)
    private alertRepository: Repository<AlertEntity>
  ) {}

  all() {
    return this.alertRepository.find();
  }

  async create(data: Omit<AlertEntity, 'id'>): Promise<void> {
    await this.alertRepository.insert(data);
  }

  async delete(id: number): Promise<void> {
    await this.alertRepository.delete(id);
  }
}
