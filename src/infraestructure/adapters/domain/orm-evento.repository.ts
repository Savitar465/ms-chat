import {Injectable} from "@nestjs/common";
import {EventoRepository} from "../../../core/domain/ports/outbound/evento.repository";
import {Evento} from "../../../core/domain/models/evento";
import {InjectRepository} from "@nestjs/typeorm";
import {MongoRepository} from "typeorm";
import {EventoEntity} from "../../persistance/entities/evento.entity";

@Injectable()
export class OrmEventoRepository implements EventoRepository {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly userRepository: MongoRepository<EventoEntity>,
    ) {
    }

    async save(evento: Evento): Promise<EventoEntity> {
        const eventoEntity: EventoEntity = {
            _id: evento.eventoId,
            usuarioId: evento.usuarioId,
            mensaje: evento.mensaje,
            tipo: evento.tipo,
            usu_cre: evento.usu_cre,
            fec_cre: evento.fec_cre,
            usu_mod: evento.usu_mod,
            fec_mod: evento.fec_mod
        }
        return this.userRepository.save(eventoEntity)
    }

    findById(id: string): Promise<EventoEntity> {
        console.log(
            this.userRepository.findOneBy({
                where: {
                    _id: id
                }
            }));
        return this.userRepository.findOneBy({
            where: {
                _id: id
            }
        })
    }

}