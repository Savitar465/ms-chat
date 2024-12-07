import { ConstantsRepository } from '../../../interfaces/dependency-injection/constants/constants';
import { Inject, Injectable } from '@nestjs/common';
import { MensajeRepository } from '../ports/outbound/mensaje.repository';
import { Mensaje } from '../models/mensaje';
import { CrearMensajeRequest } from '../../../interfaces/dtos/crear-mensaje.request';
import { EventBus } from '@nestjs/cqrs';
import { MensajeCreadoEvent } from '../events/mensaje-creado.event';
import { FindMensajeQuery } from '../../application/query/mensaje/find-mensaje.query';

@Injectable()
export class MensajeService {
  constructor(
    @Inject(ConstantsRepository.MENSAJE_REPOSITORY)
    private readonly mensajeRepository: MensajeRepository,
    private readonly eventEventBus: EventBus,
  ) {}

  async save(crearMensajeRequest: CrearMensajeRequest) {
    return Mensaje.create({
      usuarioId: crearMensajeRequest.usuarioId,
      contenido: crearMensajeRequest.contenido,
      fecha_hora_envio: crearMensajeRequest.fecha_hora_envio,
      tipo: crearMensajeRequest.tipo,
    }).then(async (mensaje) => {
      const mensajeE = await this.mensajeRepository.save(mensaje);
      if (mensajeE) {
        this.eventEventBus.publish(new MensajeCreadoEvent(mensaje));
      }
      return mensaje;
    });
  }

  async findById(query: FindMensajeQuery) {
    return this.mensajeRepository.findById(query.id);
  }
}
