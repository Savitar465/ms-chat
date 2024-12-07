import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CambioCreadoEvent } from '../../../domain/events/cambio-creado.event';

@EventsHandler(CambioCreadoEvent)
export class CambioCreadoHandler implements IEventHandler<CambioCreadoEvent> {
  async handle(event: CambioCreadoEvent) {
    console.log('Cambio creado: ', event.getData());
  }
}
