import { Injectable } from '@nestjs/common';
import { CambioRepository } from '../../../core/domain/ports/outbound/cambio.repository';
import { Cambio } from '../../../core/domain/models/cambio';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CambioEntity } from '../../persistance/entities/cambio.entity';

@Injectable()
export class OrmCambioRepository implements CambioRepository {
  constructor(
    @InjectRepository(CambioEntity)
    private readonly userRepository: MongoRepository<CambioEntity>,
  ) {}

  async save(cambio: Cambio): Promise<CambioEntity> {
    const cambioEntity: CambioEntity = {
      _id: cambio.cambioId,
      detalles_evento_detalles_evento_id: cambio.detallesEventoId,
      usuario_id: cambio.usuarioId,
      valor_antiguo: cambio.valorAntiguo,
      valor_nuevo: cambio.valorNuevo,
      usu_cre: cambio.usu_cre,
      fec_cre: cambio.fec_cre,
      usu_mod: cambio.usu_mod,
      fec_mod: cambio.fec_mod,
    };
    return this.userRepository.save(cambioEntity);
  }

  findById(id: string): Promise<CambioEntity> {
    console.log(
      this.userRepository.findOneBy({
        where: {
          _id: id,
        },
      }),
    );
    return this.userRepository.findOneBy({
      where: {
        _id: id,
      },
    });
  }
}
