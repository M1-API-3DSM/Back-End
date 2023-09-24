import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cargo } from './cargo.entity';

@Injectable()
export class CargoService {
  constructor(
    @Inject('Cargo_REPOSITORY')
    private cargoRepository: Repository<Cargo>,
  ) {}

  async findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find();
  }
}
