import { CrearUsuarioRequest } from "src/interfaces/dtos/crear-usuario.request";

export class CrearUsuarioCommand {
    constructor(public readonly crearUsuarioRequest: CrearUsuarioRequest) {
    }
}