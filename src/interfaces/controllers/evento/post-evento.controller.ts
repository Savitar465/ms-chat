import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CrearEventoRequest } from '../../dtos/crear-evento.request';
import { CrearEventoCommand } from '../../../core/application/commands/evento/crear-evento.command';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('eventos')
@Controller('v1/eventos')
export class PostEventoController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async run(@Body() body: CrearEventoRequest) {
    return this.commandBus.execute(
      new CrearEventoCommand({
        usuarioId: body.usuarioId,
        mensaje: body.mensaje,
        tipo: body.tipo,
      }),
    );
  }
}
