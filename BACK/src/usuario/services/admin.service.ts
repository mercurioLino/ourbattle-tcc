import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { Admin } from './../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private repository: Repository<Admin>) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin: Admin = this.repository.create(createAdminDto);
    return this.repository.save(admin);
  }

  async findAll(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Admin>> {
    const where: FindManyOptions<Admin> = {};

    return paginate<Admin>(this.repository, options, where);
  }
}
