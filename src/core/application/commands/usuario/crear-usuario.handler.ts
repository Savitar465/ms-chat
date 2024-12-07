import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CrearUsuarioCommand } from "./crear-usuario.command";
import { CrearUsuarioUsecase } from "../../usecases/usuario/crear-usuario.usecase";
import { Usuario } from "src/core/domain/models/usuario";

@CommandHandler(CrearUsuarioCommand)
export class CrearUsuarioHandler implements ICommandHandler<CrearUsuarioCommand> {

    constructor(private crearUsuarioUseCase: CrearUsuarioUsecase) {
    }

    async execute(command: CrearUsuarioCommand): Promise<Usuario> {
        return await this.crearUsuarioUseCase.execute(
            command.crearUsuarioRequest
        );
    }
}