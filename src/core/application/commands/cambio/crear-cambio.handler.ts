import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CrearCambioCommand } from './crear-cambio.command';
import { CrearCambioUsecase } from '../../usecases/cambio/crear-cambio.usecase';
import { Cambio } from '../../../domain/models/cambio';

@CommandHandler(CrearCambioCommand)
export class CrearCambioHandler
  implements ICommandHandler<CrearCambioCommand>
{
  constructor(private crearCambioUseCase: CrearCambioUsecase) {}

  async execute(command: CrearCambioCommand): Promise<Cambio> {
    return await this.crearCambioUseCase.execute(command.crearCambioRequest);
  }
}
