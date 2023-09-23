import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
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
              i = i + 1
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

      const itensSemFilho = await this.itemService.findSemFilho(projeto.id_projeto)
      
      for (let itemSemFilho of itensSemFilho) {
        itemSemFilho.sem_filho = true;
        await this.itemService.update(itemSemFilho.id_item, itemSemFilho);
      }
      
      
      
      return projeto;
    } catch (error) {
      throw new Error(
        'Erro ao criar o projeto a partir do JSON: ' + error.message,
      );
    }
  }

  @Get()
  async findAllWithItens(): Promise<any[]> {
    const projetos = await this.projetoService.findAllWithItens();

    // Mapeia os projetos com a hierarquia de itens
    const projetosComItens = projetos.map((projeto) => {
      projeto.itens = this.buildItemHierarchy(projeto.itens);
      return projeto;
    });

    return projetosComItens;
  }

  private buildItemHierarchy(itens: Item[]): any[] {
    const itemMap = new Map<string, any>();

    itens.forEach(item => {
      itemMap.set(item.item, {
        item: item.item,
        nome_item: item.nome_item,
        itens_filhos: [] // Inicialmente, configura uma matriz vazia para os itens filhos
      });
    });

    // Constrói a hierarquia dos itens
    itemMap.forEach((item, key) => {
      const parentKey = key.split('.').slice(0, -1).join('.');
      if (parentKey !== "") {
        // Este item tem um item pai
        if (itemMap.has(parentKey)) {
          // Adiciona como um item filho do item pai
          itemMap.get(parentKey).itens_filhos.push(item);
        }
      }
    });

    // Filtra os itens de nível superior (aqueles sem pai)
    const itensTopo = Array.from(itemMap.values()).filter(item => item.item.split('.').length === 1);

    return itensTopo;
  }

  @Get(':id')
  async findProjectWithItens(@Param('id') id: number): Promise<any> {
    const projeto = await this.projetoService.findOne(id);

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID ${id} não encontrado`);
    }

    projeto.itens = await this.itemService.findItensByProjeto(id);

    // Mapeia o nome do projeto
    const nomeProjeto = projeto.nome_projeto;

    // Cria um objeto que mapeia os itens 
    const itemMap = new Map<string, any>();

    projeto.itens.forEach(item => {
      itemMap.set(item.item, {
        item: item.item,
        nome_item: item.nome_item,
        itens_filhos: [] // Inicialmente, configura uma matriz vazia para os itens filhos
      });
    });

    // Constrói a hierarquia dos itens
    itemMap.forEach((item, key) => {
      const parentKey = key.split('.').slice(0, -1).join('.');
      if (parentKey !== "") {
        // Este item tem um item pai
        if (itemMap.has(parentKey)) {
          // Adiciona como um item filho do item pai
          itemMap.get(parentKey).itens_filhos.push(item);
        }
      }
    });

    // Filtra os itens de nível superior (aqueles sem pai)
    const itensTopo = Array.from(itemMap.values()).filter(item => item.item.split('.').length === 1);

    // Retorna o resultado 
    return {
      nome_projeto: nomeProjeto,
      itens: itensTopo,
    };
  }
}
