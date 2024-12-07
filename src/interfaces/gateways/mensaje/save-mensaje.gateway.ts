import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@WebSocketGateway()
export class SaveMensajeGateway {

  constructor(
    @InjectPinoLogger(SaveMensajeGateway.name)
    private readonly log: PinoLogger
  ) {
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.log.info('Cliente: '+client+'\n Mensaje recibido: ' + payload);
    return 'Hello world!';
  }
}
