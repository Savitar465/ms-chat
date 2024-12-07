import {Module, Provider} from '@nestjs/common';
import {PostEventoController} from "../../controllers/evento/post-evento.controller";
import {GetEventoController} from "../../controllers/evento/get-evento.controller";
import {EventoRepository} from "../../../core/domain/ports/outbound/evento.repository";
import {CrearEventoHandler} from "../../../core/application/commands/evento/crear-evento.handler";
import {CrearEventoUsecase} from "../../../core/application/usecases/evento/crear-evento.usecase";
import {ConstantsRepository} from "../constants/constants";
import {OrmEventoRepository} from "../../../infraestructure/adapters/domain/orm-evento.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventoEntity} from "../../../infraestructure/persistance/entities/evento.entity";
import {EventoService} from "../../../core/domain/services/evento.service";
import {EventoCreadoHandler} from "../../../core/application/events/evento/evento-creado.handler";
import {FindEventoUsecase} from "../../../core/application/usecases/evento/find-evento.usecase";
import {FindEventoQueryHandler} from "../../../core/application/query/evento/find-evento.handler";

const repositoryFactory: Provider<EventoRepository> = {
    provide: ConstantsRepository.EVENTO_REPOSITORY,
    useClass: OrmEventoRepository
}

const serviceProviders = [
    EventoService
]

const useCaseProviders = [
    {
        provide: CrearEventoUsecase,
        useFactory: (eventoS: EventoService) => new CrearEventoUsecase(eventoS),
        inject: [EventoService]
    },
    {
        provide: FindEventoUsecase,
        useFactory: (eventoS: EventoService) => new FindEventoUsecase(eventoS),
        inject: [EventoService]
    }
]
const handlerProviders = [
    CrearEventoHandler,
    FindEventoQueryHandler
]
const EventHandlers = [
    EventoCreadoHandler
];

@Module({
    imports: [TypeOrmModule.forFeature([EventoEntity])],
    providers: [
        repositoryFactory,
        ...serviceProviders,
        ...handlerProviders,
        ...useCaseProviders,
        ...EventHandlers,
    ],
    controllers: [
        PostEventoController,
        GetEventoController
    ],
    exports: [TypeOrmModule, EventoService]
})
export class EventoModule {
}
