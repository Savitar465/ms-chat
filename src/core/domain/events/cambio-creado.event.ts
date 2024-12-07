import {DomainEvent} from "../../shared/domain-event";
import {Cambio} from "../models/cambio";

export class CambioCreadoEvent extends DomainEvent<Cambio> {

    public static readonly EVENT_NAME = 'cambio-creado'

    constructor(cambio: Cambio) {
        super(cambio);
    }

    getName() {
        return CambioCreadoEvent.EVENT_NAME;
    }
}