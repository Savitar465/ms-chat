import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CrearCambioRequest } from '../../dtos/crear-cambio.request';
import { CrearCambioCommand } from '../../../core/application/commands/cambio/crear-cambio.command';
import { Cambio } from 'src/core/domain/models/cambio';

@ApiTags('cambios')
@Controller('v1/cambios')
export class PostCambioController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Cambio creado con exito.',
    type: Cambio,
  })
  async run(@Body() body: CrearCambioRequest) {
    return this.commandBus.execute(
      new CrearCambioCommand({
        detallesEventoId: body.detallesEventoId,
        usuarioId: body.usuarioId,
        valorAntiguo: body.valorAntiguo,
        valorNuevo: body.valorNuevo,
      }),
    );
  }
}
