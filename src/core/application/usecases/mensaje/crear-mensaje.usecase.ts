import { Inject, Injectable } from '@nestjs/common';
import { ConstantsService } from '../../../../interfaces/dependency-injection/constants/constants';
import { CrearMensajeRequest } from '../../../../interfaces/dtos/crear-mensaje.request';
import { MensajeService } from '../../../domain/services/mensaje.service';
import { Mensaje } from '../../../domain/models/mensaje';

@Injectable()
export class CrearMensajeUsecase {
  constructor(
    @Inject(ConstantsService.MENSAJE_SERVICE)
    private readonly mensajeService: MensajeService,
  ) {}

  async execute(crearMensajeRequest: CrearMensajeRequest): Promise<Mensaje> {
    return this.mensajeService.save(crearMensajeRequest);
  }
}
