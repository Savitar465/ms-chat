import { Inject, Injectable } from '@nestjs/common';
import { ConstantsService } from '../../../../interfaces/dependency-injection/constants/constants';
import { CambioService } from '../../../domain/services/cambio.service';
import { FindCambioQuery } from '../../query/cambio/find-cambio.query';

@Injectable()
export class FindCambioUsecase {
  constructor(
    @Inject(ConstantsService.CAMBIO_SERVICE)
    private readonly cambioService: CambioService,
  ) {}
  async ask(query: FindCambioQuery) {
    return await this.cambioService.findById(query);
  }
}