import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('Usuario_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findByNomeEquipe(nome: any, equipe: any): Promise<Usuario | undefined> {

    const query = this.usuarioRepository.createQueryBuilder('usuario').where(`nome = '${nome}' AND nome_equipe = '${equipe}' `);
    const usuario = await query.getOne();
    return usuario
  }

  async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
    const projeto = this.usuarioRepository.create(usuarioData);
    return this.usuarioRepository.save(projeto);
  }

  async create_many(ususarioData: any): Promise<Usuario | undefined>  {
    if (!Array.isArray(ususarioData) || ususarioData.length === 0) {
      throw new Error('O JSON deve ser um array não vazio.');
    }
    console.log(ususarioData);  

    return 
  }
  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id_usuario: id } });
  }

  async update(
    id: number,
    ususarioData: Partial<Usuario>,
  ): Promise<Usuario | undefined> {
    await this.usuarioRepository.update(id, ususarioData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
