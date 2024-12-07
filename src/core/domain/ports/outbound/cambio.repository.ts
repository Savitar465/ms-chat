import { Cambio } from '../../models/cambio';
import { CambioEntity } from '../../../../infraestructure/persistance/entities/cambio.entity';

export interface CambioRepository {
  save(cambio: Cambio): Promise<CambioEntity>;
  findById(id: string): Promise<CambioEntity>;
}
