import {DomainEvent} from "../../shared/domain-event";
import {Mensaje} from "../models/mensaje";

export class MensajeCreadoEvent extends DomainEvent<Mensaje> {

    public static readonly EVENT_NAME = 'mensaje-creado'

    constructor(mensaje: Mensaje) {
        super(mensaje);
    }

    getName() {
        return MensajeCreadoEvent.EVENT_NAME;
    }
}