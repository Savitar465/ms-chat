import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FindCambioQuery } from '../../../core/application/query/cambio/find-cambio.query';
import { Cambio } from 'src/core/domain/models/cambio';

export interface Query {
  id: string;
}
@ApiTags('cambios')
@Controller('v1/cambios')
export class GetCambioController {
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
    description: "Cambio encontrado con exito.",
    type: Cambio
  })
  async run(@Query() query: Query) {
    console.log(query.id);
    console.log(await this.queryBus.execute(new FindCambioQuery(query.id)));
    return await this.queryBus.execute(new FindCambioQuery(query.id));
  }
}
