import { CrearCambioRequest } from 'src/interfaces/dtos/crear-cambio.request';

export class CrearCambioCommand {
  constructor(public readonly crearCambioRequest: CrearCambioRequest) {}
}