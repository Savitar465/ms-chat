import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindMensajeQuery } from './find-mensaje.query';
import { FindMensajeUsecase } from '../../usecases/mensaje/find-mensaje.usecase';

@QueryHandler(FindMensajeQuery)
export class FindMensajeQueryHandler implements IQueryHandler<FindMensajeQuery> {
  constructor(private readonly findMensajeUsecase: FindMensajeUsecase) {}
  async execute(query: FindMensajeQuery) {
    return await this.findMensajeUsecase.ask(query);
  }
}
