import { Inject, Injectable } from '@nestjs/common';
import { ConstantsService } from '../../../../interfaces/dependency-injection/constants/constants';
import { CrearCambioRequest } from '../../../../interfaces/dtos/crear-cambio.request';
import { CambioService } from '../../../domain/services/cambio.service';
import { Cambio } from '../../../domain/models/cambio';

@Injectable()
export class CrearCambioUsecase {
  constructor(
    @Inject(ConstantsService.CAMBIO_SERVICE)
    private readonly cambioService: CambioService,
  ) {}

  async execute(crearCambioRequest: CrearCambioRequest): Promise<Cambio> {
    return this.cambioService.save(crearCambioRequest);
  }
}
