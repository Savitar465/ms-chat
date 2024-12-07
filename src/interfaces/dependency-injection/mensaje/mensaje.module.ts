import { Module, Provider } from '@nestjs/common';
import { PostMensajeController } from '../../controllers/mensaje/post-mensaje.controller';
import { GetMensajeController } from '../../controllers/mensaje/get-mensaje.controller';
import { MensajeRepository } from '../../../core/domain/ports/outbound/mensaje.repository';
import { CrearMensajeHandler } from '../../../core/application/commands/mensaje/crear-mensaje.handler';
import { CrearMensajeUsecase } from '../../../core/application/usecases/mensaje/crear-mensaje.usecase';
import { ConstantsRepository } from '../constants/constants';
import { OrmMensajeRepository } from '../../../infraestructure/adapters/domain/orm-mensaje.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajeEntity } from '../../../infraestructure/persistance/entities/mensaje.entity';
import { MensajeService } from '../../../core/domain/services/mensaje.service';
import { MensajeCreadoHandler } from '../../../core/application/events/mensaje/mensaje-creado.handler';
import { FindMensajeUsecase } from '../../../core/application/usecases/mensaje/find-mensaje.usecase';
import { FindMensajeQueryHandler } from '../../../core/application/query/mensaje/find-mensaje-handler';

const repositoryFactory: Provider<MensajeRepository> = {
  provide: ConstantsRepository.MENSAJE_REPOSITORY,
  useClass: OrmMensajeRepository,
};

const serviceProviders = [MensajeService];

const useCaseProviders = [
  {
    provide: CrearMensajeUsecase,
    useFactory: (mensajeS: MensajeService) => new CrearMensajeUsecase(mensajeS),
    inject: [MensajeService],
  },
  {
    provide: FindMensajeUsecase,
    useFactory: (mensajeS: MensajeService) => new FindMensajeUsecase(mensajeS),
    inject: [MensajeService],
  },
];
const handlerProviders = [CrearMensajeHandler, FindMensajeQueryHandler];
export const EventHandlers = [MensajeCreadoHandler];

@Module({
  imports: [TypeOrmModule.forFeature([MensajeEntity])],
  providers: [
    repositoryFactory,
    ...serviceProviders,
    ...handlerProviders,
    ...useCaseProviders,
    ...EventHandlers,
  ],
  controllers: [PostMensajeController, GetMensajeController],
  exports: [TypeOrmModule],
})
export class MensajeModule {}
