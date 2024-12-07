import {Global, Module} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import { MongoDatabaseModule } from './interfaces/dependency-injection/mongo-database/mongo-database.module';
import { EventoModule } from './interfaces/dependency-injection/evento/evento.module';
import { MensajeModule } from './interfaces/dependency-injection/mensaje/mensaje.module';
import { UsuarioModule } from './interfaces/dependency-injection/usuario/usuario.module';
import { CambioModule } from './interfaces/dependency-injection/cambio/cambio.module';
import {LoggerModule} from "nestjs-pino";
import { ConfigModule } from '@nestjs/config';
import { SaveMensajeGateway } from './interfaces/gateways/mensaje/save-mensaje.gateway';
import databaseConfig from './infraestructure/shared/config/database.config';

@Global()
@Module({
  imports: [
    EventoModule,
    MensajeModule,
    CambioModule,
    UsuarioModule,
    CqrsModule,
    MongoDatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [databaseConfig],
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        levelFirst: true,
                        translateTime: 'SYS:standard',
                        ignore: 'pid,hostname,req,res,responseTime',
                    },
                },
                autoLogging: true,
            },
    }),
  ],
  exports: [CqrsModule, MongoDatabaseModule],
  providers: [SaveMensajeGateway],
})
export class AppModule {
}
