import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MensajeCreadoEvent } from '../../../domain/events/mensaje-creado.event';

@EventsHandler(MensajeCreadoEvent)
export class MensajeCreadoHandler implements IEventHandler<MensajeCreadoEvent> {
  async handle(event: MensajeCreadoEvent) {
    console.log('Mensaje creado: ', event.getData());
  }
}
