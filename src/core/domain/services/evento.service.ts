import {ConstantsRepository} from "../../../interfaces/dependency-injection/constants/constants";
import {Inject, Injectable} from "@nestjs/common";
import {EventoRepository} from "../ports/outbound/evento.repository";
import {Evento} from "../models/evento";
import {CrearEventoRequest} from "../../../interfaces/dtos/crear-evento.request";
import {EventBus} from "@nestjs/cqrs";
import {EventoCreadoEvent} from "../events/evento-creado.event";
import {FindEventoQuery} from "../../application/query/evento/find-evento.query";

@Injectable()
export class EventoService {
    constructor(
        @Inject(ConstantsRepository.EVENTO_REPOSITORY)
        private readonly eventoRepository: EventoRepository,
        private readonly eventEventBus: EventBus,
    ) {
    }

    async save(crearEventoRequest: CrearEventoRequest) {
        return Evento.create({
            usuarioId: crearEventoRequest.usuarioId,
            mensaje: crearEventoRequest.mensaje,
            tipo: crearEventoRequest.tipo
        }).then(async (evento) => {
            const eventoE = await this.eventoRepository.save(evento);
            if (eventoE) {
                this.eventEventBus.publish(new EventoCreadoEvent(evento));
            }
            return evento;
        });
    }
    
    async findById(query: FindEventoQuery) {
        return this.eventoRepository.findById(query.id);
    }
}
