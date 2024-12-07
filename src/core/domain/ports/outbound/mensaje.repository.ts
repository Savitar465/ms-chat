import { Mensaje } from '../../models/mensaje';
import { MensajeEntity } from '../../../../infraestructure/persistance/entities/mensaje.entity';

export interface MensajeRepository {
  save(mensaje: Mensaje): Promise<MensajeEntity>;
  findById(id: string): Promise<MensajeEntity>;
}
