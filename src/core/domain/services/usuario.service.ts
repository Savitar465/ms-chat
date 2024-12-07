import { ConstantsRepository } from "../../../interfaces/dependency-injection/constants/constants";
import { Inject, Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { UsuarioRepository } from "../ports/outbound/usuario.repository";
import { CrearUsuarioRequest } from "src/interfaces/dtos/crear-usuario.request";
import { Usuario } from "../models/usuario";
import { UsuarioCreadoEvent } from "../events/usuario-creado.event";
import { FindUsuarioQuery } from "src/core/application/query/usuario/find-usuario.query";

@Injectable()
export class UsuarioService {
    constructor(
        @Inject(ConstantsRepository.USUARIO_REPOSITORY)
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioEventBus: EventBus,
    ) {
    }

    async save(crearUsuarioRequest: CrearUsuarioRequest) {
        return Usuario.create({
            username: crearUsuarioRequest.username,
            email: crearUsuarioRequest.email,
            estado: crearUsuarioRequest.estado
        }).then(async (usuario) => {
            const usuarioE = await this.usuarioRepository.save(usuario);
            if (usuarioE) {

                this.usuarioEventBus.publish(new UsuarioCreadoEvent(usuario));
            }
            return usuario;
        });
    }

    async findById(query: FindUsuarioQuery) {
        return this.usuarioRepository.findById(query.id);
    }
}
