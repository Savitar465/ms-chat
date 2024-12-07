import {DomainEvent} from "../../shared/domain-event";
import {Evento} from "../models/evento";

export class EventoCreadoEvent extends DomainEvent<Evento> {

    public static readonly EVENT_NAME = 'evento-creado'

    constructor(evento: Evento) {
        super(evento);
    }

    getName() {
        return EventoCreadoEvent.EVENT_NAME;
    }
}