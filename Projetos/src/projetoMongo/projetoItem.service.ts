import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjetoItem } from './projetoItem.schema';

@Injectable()
export class ProjetoItemService {
  constructor(@InjectModel(ProjetoItem.name) private projetoItemModel: Model<ProjetoItem>) {}

  async create(projetoItemData: any): Promise<ProjetoItem> {
    const createdProjetoItem = new this.projetoItemModel(projetoItemData);
    return createdProjetoItem.save();
  }

  async findAll(): Promise<ProjetoItem[]> {
    return this.projetoItemModel.find().exec();
  }

  async findOne(id: string): Promise<ProjetoItem> {
    return this.projetoItemModel.findById(id).exec();
  }

  async update(id: string, projetoItemData: any): Promise<ProjetoItem> {
    return this.projetoItemModel.findByIdAndUpdate(id, projetoItemData, { new: true }).exec();
  }

  async remove(id: string): Promise<ProjetoItem> {
    return this.projetoItemModel.findByIdAndRemove(id).exec();
  }
}
