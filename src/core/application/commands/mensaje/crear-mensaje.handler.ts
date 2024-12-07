import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CrearMensajeCommand } from './crear-mensaje.command';
import { CrearMensajeUsecase } from '../../usecases/mensaje/crear-mensaje.usecase';
import { Mensaje } from '../../../domain/models/mensaje';

@CommandHandler(CrearMensajeCommand)
export class CrearMensajeHandler
  implements ICommandHandler<CrearMensajeCommand>
{
  constructor(private crearMensajeUseCase: CrearMensajeUsecase) {}

  async execute(command: CrearMensajeCommand): Promise<Mensaje> {
    return await this.crearMensajeUseCase.execute(command.crearMensajeRequest);
  }
}
