import { Inject, Injectable } from "@nestjs/common";
import { ConstantsService } from "../../../../interfaces/dependency-injection/constants/constants";
import { UsuarioService } from "src/core/domain/services/usuario.service";
import { FindUsuarioQuery } from "../../query/usuario/find-usuario.query";

@Injectable()
export class FindUsuarioUsecase {
    constructor(
        @Inject(ConstantsService.USUARIO_SERVICE)
        private readonly usuarioService: UsuarioService
    ) {
    }
    async ask(query: FindUsuarioQuery) {
        return await this.usuarioService.findById(query)
    }
}