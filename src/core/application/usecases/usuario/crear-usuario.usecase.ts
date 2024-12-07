import { Inject, Injectable } from '@nestjs/common';
import { ConstantsService } from "../../../../interfaces/dependency-injection/constants/constants";
import { UsuarioService } from 'src/core/domain/services/usuario.service';
import { Usuario } from 'src/core/domain/models/usuario';
import { CrearUsuarioRequest } from 'src/interfaces/dtos/crear-usuario.request';

@Injectable()
export class CrearUsuarioUsecase {
    constructor(
        @Inject(ConstantsService.USUARIO_SERVICE)
        private readonly usuarioService: UsuarioService
    ) {
    }

    async execute(crearUsuarioRequest: CrearUsuarioRequest): Promise<Usuario> {
        return this.usuarioService.save(crearUsuarioRequest);
    }
}