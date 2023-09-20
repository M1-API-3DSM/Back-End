import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ProjetoService } from '../projeto/projeto.service';
import { Projeto } from '../projeto/projeto.entity';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/item/item.entity';

@Controller('projetoItem/')
export class CriarProjetoController {
  constructor(
    private readonly projetoService: ProjetoService,
    private readonly itemService: ItemService,
  ) { }

  @Post('criar')
  async create(@Body() jsonData: any): Promise<Projeto | undefined> {
    try {
      const projeto = await this.projetoService.criarProjeto(jsonData.parsedData[0]);
      // Salvar todos os itens no banco de dados
      const savedItens: Item[] = [];
      let parentItem: Item | null = null;

      for (let i = 0; i < jsonData.parsedData.length; i++) {
        const row = jsonData.parsedData[i];
        const keys = Object.keys(row);

        for (const key of keys) {
          const cellValue = Object.values(row[key])[0];
          console.log(cellValue)
  
          if (typeof cellValue === 'string') {
            let match;
  
            if (i === 0) {
              match = cellValue.match(/(\d+)\.\s+(.+)/);
            } else {
              match = cellValue.match(/(\d+(?:\.\d+)*)\s+(.+)/);
            }

            if (match) {
              const numero = match[1].trim();
              const nome = match[2].trim();

              // Crie um novo item com base nos dados extraídos
              const newItemData = {
                item: numero,
                nome_item: nome,
                projeto: projeto,
                itemPai: parentItem,
              };

              const newItem = await this.itemService.create(newItemData);
              savedItens.push(newItem);

              // Atualize o item pai para o novo item criado
              parentItem = newItem;
              i = i+1
            }
          }
        }

        // Organização dos itens em uma estrutura hierárquica
        savedItens.sort((a, b) => a.item.localeCompare(b.item)); // Ordena por numeração

        for (let i = 0; i < savedItens.length; i++) {
          const currentItem = savedItens[i];

          if (i > 0) {
            // Encontrar o item pai
            const parent = savedItens.slice(0, i).reverse().find((item) => currentItem.item.startsWith(item.item));

            if (parent) {
              currentItem.itemPai = parent;
              await this.itemService.update(currentItem.id_item, { itemPai: parent });
            }
          }
        }
      }

      return projeto;
    } catch (error) {
      throw new Error('Erro ao criar o projeto a partir do JSON: ' + error.message);
    }
  }

  @Get()
  async findAllWithItens(): Promise<any[]> {
    const projetos = await this.projetoService.findAllWithItens();
    return projetos.map((projeto) => ({
      projeto,
    }));
  }

  @Get(':id')
  async findProjectWithItens(@Param('id') id: number): Promise<any> {
    const projeto = await this.projetoService.findOne(id);

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }

    projeto.itens = await this.itemService.findItensByProjeto(id);

    return {
      projeto,
    };
  }
}
