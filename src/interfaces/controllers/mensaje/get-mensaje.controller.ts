import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FindMensajeQuery } from '../../../core/application/query/mensaje/find-mensaje.query';
import { Mensaje } from 'src/core/domain/models/mensaje';

export interface Query {
  id: string;
}
@ApiTags('mensajes')
@Controller('v1/mensajes')
export class GetMensajeController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @ApiQuery({
    name: 'id',
    description: 'ID of the item',
    type: String,
    required: true,
    example: '123',
  })
  @ApiOkResponse({
    description: "Mensaje encontrado con exito.",
    type: Mensaje
  })
  async run(@Query() query: Query) {
    console.log(query.id);
    console.log(await this.queryBus.execute(new FindMensajeQuery(query.id)));
    return await this.queryBus.execute(new FindMensajeQuery(query.id));
  }
}
