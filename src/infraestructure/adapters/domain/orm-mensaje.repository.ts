import { Injectable } from '@nestjs/common';
import { MensajeRepository } from '../../../core/domain/ports/outbound/mensaje.repository';
import { Mensaje } from '../../../core/domain/models/mensaje';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { MensajeEntity } from '../../persistance/entities/mensaje.entity';

@Injectable()
export class OrmMensajeRepository implements MensajeRepository {
  constructor(
    @InjectRepository(MensajeEntity)
    private readonly userRepository: MongoRepository<MensajeEntity>,
  ) {}

  async save(mensaje: Mensaje): Promise<MensajeEntity> {
    const mensajeEntity: MensajeEntity = {
      _id: mensaje.mensajeId,
      usuarioId: mensaje.usuarioId,
      contenido: mensaje.contenido,
      fecha_hora_envio: mensaje.fecha_hora_envio,
      tipo: mensaje.tipo,
      usu_cre: mensaje.usu_cre,
      fec_cre: mensaje.fec_cre,
      usu_mod: mensaje.usu_mod,
      fec_mod: mensaje.fec_mod,
    };
    return this.userRepository.save(mensajeEntity);
  }

  findById(id: string): Promise<MensajeEntity> {
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
