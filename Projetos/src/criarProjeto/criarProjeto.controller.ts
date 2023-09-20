import { Controller, Post, Body } from '@nestjs/common';
import { ProjetoService } from '../projeto/projeto.service';
import { Projeto } from '../projeto/projeto.entity';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/item/item.entity';

@Controller('criarProjeto/')
export class CriarProjetoController {
  constructor(
    private readonly projetoService: ProjetoService,
    private readonly itemService: ItemService,
    ) {}

    @Post()
async create(@Body() jsonData: any): Promise<Projeto | undefined> {
  try {
    const projeto = await this.projetoService.criarProjeto(jsonData);
    let parentItem: Item | null = null;

    for (let i = 0; i < jsonData.length; i++) {
      const row = jsonData[i];
      const keys = Object.keys(row);

      if (keys.length > 0) {
        const key = keys[0];
        let match;

        if (i === 0) {
          match = row[key].match(/(\d+)\.\s+(.+)/);
        } else {
          match = row[key].match(/(\d+(?:\.\d+)*)\s+(.+)/);
        }

        if (match) {
          const numero = match[1];
          const nome = match[2];

          const newItemData = {
            item: numero,
            nome_item: nome,
            projeto: projeto,
            itemPai: parentItem, // Associando o item pai corretamente
          };

          const newItem = await this.itemService.create(newItemData);

          // Atualizando o item pai para o novo item criado
          parentItem = newItem;
        }
      }
    }

    return projeto;
  } catch (error) {
    throw new Error('Erro ao criar o projeto a partir do JSON: ' + error.message);
  }
}   
}

