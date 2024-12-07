import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CrearEventoCommand} from "./crear-evento.command";
import {CrearEventoUsecase} from "../../usecases/evento/crear-evento.usecase";
import {Evento} from "../../../domain/models/evento";

@CommandHandler(CrearEventoCommand)
export class CrearEventoHandler implements ICommandHandler<CrearEventoCommand> {

    constructor(private crearEventoUseCase: CrearEventoUsecase) {
    }

    async execute(command: CrearEventoCommand): Promise<Evento> {
        return await this.crearEventoUseCase.execute(
            command.crearEventoRequest
        );
    }
}