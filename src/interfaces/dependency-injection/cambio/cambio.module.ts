import { Module, Provider } from '@nestjs/common';
import { PostCambioController } from '../../controllers/cambio/post-cambios.controller';
import { GetCambioController } from '../../controllers/cambio/get-cambios.controller';
import { CambioRepository } from '../../../core/domain/ports/outbound/cambio.repository';
import { CrearCambioHandler } from '../../../core/application/commands/cambio/crear-cambio.handler';
import { CrearCambioUsecase } from '../../../core/application/usecases/cambio/crear-cambio.usecase';
import { ConstantsRepository } from '../constants/constants';
import { OrmCambioRepository } from '../../../infraestructure/adapters/domain/orm-cambio.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CambioEntity } from '../../../infraestructure/persistance/entities/cambio.entity';
import { CambioService } from '../../../core/domain/services/cambio.service';
import { CambioCreadoHandler } from '../../../core/application/events/cambio/cambio-creado.handler';
import { FindCambioUsecase } from '../../../core/application/usecases/cambio/find-cambio.usecase';
import { FindCambioQueryHandler } from '../../../core/application/query/cambio/find-cambio.handler';

const repositoryFactory: Provider<CambioRepository> = {
  provide: ConstantsRepository.CAMBIO_REPOSITORY,
  useClass: OrmCambioRepository,
};

const serviceProviders = [CambioService];

const useCaseProviders = [
  {
    provide: CrearCambioUsecase,
    useFactory: (cambioS: CambioService) => new CrearCambioUsecase(cambioS),
    inject: [CambioService],
  },
  {
    provide: FindCambioUsecase,
    useFactory: (cambioS: CambioService) => new FindCambioUsecase(cambioS),
    inject: [CambioService],
  },
];
const handlerProviders = [CrearCambioHandler, FindCambioQueryHandler];
export const EventHandlers = [CambioCreadoHandler];

@Module({
  imports: [TypeOrmModule.forFeature([CambioEntity])],
  providers: [
    repositoryFactory,
    ...serviceProviders,
    ...handlerProviders,
    ...useCaseProviders,
    ...EventHandlers,
  ],
  controllers: [PostCambioController, GetCambioController],
  exports: [TypeOrmModule],
})
export class CambioModule {}
