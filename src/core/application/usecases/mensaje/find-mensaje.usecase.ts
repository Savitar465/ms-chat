import { Inject, Injectable } from '@nestjs/common';
import { ConstantsService } from '../../../../interfaces/dependency-injection/constants/constants';
import { MensajeService } from '../../../domain/services/mensaje.service';
import { FindMensajeQuery } from '../../query/mensaje/find-mensaje.query';

@Injectable()
export class FindMensajeUsecase {
  constructor(
    @Inject(ConstantsService.MENSAJE_SERVICE)
    private readonly mensajeService: MensajeService,
  ) {}
  async ask(query: FindMensajeQuery) {
    return await this.mensajeService.findById(query);
  }
}
