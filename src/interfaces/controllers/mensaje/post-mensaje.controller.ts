import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CrearMensajeRequest } from '../../dtos/crear-mensaje.request';
import { CrearMensajeCommand } from '../../../core/application/commands/mensaje/crear-mensaje.command';
import { Mensaje } from 'src/core/domain/models/mensaje';

@ApiTags('mensajes')
@Controller('v1/mensajes')
export class PostMensajeController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @ApiCreatedResponse({
    description: "Mensaje creado con exito.",
    type: Mensaje
  })
  async run(@Body() body: CrearMensajeRequest) {
    return this.commandBus.execute(
      new CrearMensajeCommand({
        usuarioId: body.usuarioId,
        contenido: body.contenido,
        fecha_hora_envio: body.fecha_hora_envio,
        tipo: body.tipo,
      }),
    );
  }
}
