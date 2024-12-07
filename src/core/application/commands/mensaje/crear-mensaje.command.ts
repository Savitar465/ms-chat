import { CrearMensajeRequest } from 'src/interfaces/dtos/crear-mensaje.request';

export class CrearMensajeCommand {
  constructor(public readonly crearMensajeRequest: CrearMensajeRequest) {}
}
