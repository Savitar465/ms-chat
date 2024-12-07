import {Evento} from "../../models/evento";
import {EventoEntity} from "../../../../infraestructure/persistance/entities/evento.entity";

export interface EventoRepository{
    save(evento: Evento): Promise<EventoEntity>;
    findById(id: string): Promise<EventoEntity>;
}