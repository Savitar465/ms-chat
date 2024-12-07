import {CrearEventoRequest} from "../../../../interfaces/dtos/crear-evento.request";

export class CrearEventoCommand {
    
    constructor(public readonly crearEventoRequest: CrearEventoRequest) {
    }
}