import { ConstantsRepository } from '../../../interfaces/dependency-injection/constants/constants';
import { Inject, Injectable } from '@nestjs/common';
import { CambioRepository } from '../ports/outbound/cambio.repository';
import { Cambio } from '../models/cambio';
import { CrearCambioRequest } from '../../../interfaces/dtos/crear-cambio.request';
import { EventBus } from '@nestjs/cqrs';
import { CambioCreadoEvent } from '../events/cambio-creado.event';
import { FindEventoQuery } from '../../application/query/evento/find-evento.query';

@Injectable()
export class CambioService {
  constructor(
    @Inject(ConstantsRepository.CAMBIO_REPOSITORY)
    private readonly cambioRepository: CambioRepository,
    private readonly eventEventBus: EventBus,
  ) {}

  async save(crearCambioRequest: CrearCambioRequest) {
    return Cambio.create({
      usuarioId: crearCambioRequest.usuarioId,
      detallesEventoId: crearCambioRequest.detallesEventoId,
      valorAntiguo: crearCambioRequest.valorAntiguo,
      valorNuevo: crearCambioRequest.valorNuevo,
    }).then(async (cambio) => {
      const cambioE = await this.cambioRepository.save(cambio);
      if (cambioE) {
        this.eventEventBus.publish(new CambioCreadoEvent(cambio));
      }
      return cambio;
    });
  }

  async findById(query: FindEventoQuery) {
    return this.cambioRepository.findById(query.id);
  }
}
