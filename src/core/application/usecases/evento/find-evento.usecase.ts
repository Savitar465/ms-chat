import {Inject, Injectable} from "@nestjs/common";
import {ConstantsService} from "../../../../interfaces/dependency-injection/constants/constants";
import {EventoService} from "../../../domain/services/evento.service";
import {FindEventoQuery} from "../../query/evento/find-evento.query";

@Injectable()
export class FindEventoUsecase{
    constructor(
        @Inject(ConstantsService.EVENTO_SERVICE)
        private readonly eventoService: EventoService
    ) {
    }
    async ask(query: FindEventoQuery) {
        return await this.eventoService.findById(query)
    }
}