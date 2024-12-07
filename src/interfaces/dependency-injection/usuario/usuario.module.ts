import { Module, Provider } from '@nestjs/common';
import { ConstantsRepository } from "../constants/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioService } from 'src/core/domain/services/usuario.service';
import { UsuarioRepository } from 'src/core/domain/ports/outbound/usuario.repository';
import { OrmUsuarioRepository } from 'src/infraestructure/adapters/domain/orm-usuario.repository';
import { CrearUsuarioUsecase } from 'src/core/application/usecases/usuario/crear-usuario.usecase';
import { FindUsuarioUsecase } from 'src/core/application/usecases/usuario/find-usuario.usecase';
import { CrearUsuarioHandler } from 'src/core/application/commands/usuario/crear-usuario.handler';
import { UsuarioCreadoHandler } from 'src/core/application/events/usuario/usuario-creado.handler';
import { UsuarioEntity } from 'src/infraestructure/persistance/entities/usuario.entity';
import { PostUsuarioController } from 'src/interfaces/controllers/usuario/post-usuario.controller';
import { GetUsuarioController } from 'src/interfaces/controllers/usuario/get-usuario.controller';
import { FindUsuarioQueryHandler } from 'src/core/application/query/usuario/find-usuario.handler';

const repositoryFactory: Provider<UsuarioRepository> = {
    provide: ConstantsRepository.USUARIO_REPOSITORY,
    useClass: OrmUsuarioRepository
}

const serviceProviders = [
    UsuarioService
]

const useCaseProviders = [
    {
        provide: CrearUsuarioUsecase,
        useFactory: (usuarioS: UsuarioService) => new CrearUsuarioUsecase(usuarioS),
        inject: [UsuarioService]
    },
    {
        provide: FindUsuarioUsecase,
        useFactory: (usuarioS: UsuarioService) => new FindUsuarioUsecase(usuarioS),
        inject: [UsuarioService]
    }
]
const handlerProviders = [
    CrearUsuarioHandler,
    FindUsuarioQueryHandler
]
export const EventHandlers = [
    UsuarioCreadoHandler
];

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    providers: [
        repositoryFactory,
        ...serviceProviders,
        ...handlerProviders,
        ...useCaseProviders,
        ...EventHandlers,
    ],
    controllers: [
        PostUsuarioController,
        GetUsuarioController
    ],
    exports: [TypeOrmModule]
})
export class UsuarioModule {
}
