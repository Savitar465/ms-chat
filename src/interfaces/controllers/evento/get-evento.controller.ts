import {Controller, Get, Query} from '@nestjs/common';
import {QueryBus} from "@nestjs/cqrs";
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import {FindEventoQuery} from "../../../core/application/query/evento/find-evento.query";

export interface Query {
    id: string
}
@ApiTags('eventos')
@Controller('v1/eventos')
export class GetEventoController {

    constructor(
        private queryBus: QueryBus
    ) {
    }
    
    @Get()
    @ApiQuery({
        name: 'id',
        description: 'ID of the item',
        type: String,
        required: true,
        example: '123',
      })
    async run(@Query() query: Query ){
        console.log(query.id);
        console.log(await this.queryBus.execute(
            new FindEventoQuery(query.id)
        ));
        return await this.queryBus.execute(
            new FindEventoQuery(query.id)
        );
    } 
}