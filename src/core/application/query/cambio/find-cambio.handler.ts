import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCambioQuery } from './find-cambio.query';
import { FindCambioUsecase } from '../../usecases/cambio/find-cambio.usecase';

@QueryHandler(FindCambioQuery)
export class FindCambioQueryHandler implements IQueryHandler<FindCambioQuery> {
  constructor(private readonly findMensajeUsecase: FindCambioUsecase) {}
  async execute(query: FindCambioQuery) {
    return await this.findMensajeUsecase.ask(query);
  }
}
