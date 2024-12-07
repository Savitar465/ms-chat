import {Inject, Injectable} from '@nestjs/common';
import {ConstantsService} from "../../../../interfaces/dependency-injection/constants/constants";
import {CrearEventoRequest} from "../../../../interfaces/dtos/crear-evento.request";
import {EventoService} from "../../../domain/services/evento.service";
import {Evento} from "../../../domain/models/evento";

@Injectable()
export class CrearEventoUsecase {
    constructor(
        @Inject(ConstantsService.EVENTO_SERVICE)
        private readonly eventoService: EventoService
    ) {
    }

    async execute(crearEventoRequest: CrearEventoRequest): Promise<Evento> {
        return this.eventoService.save(crearEventoRequest);
    }
}