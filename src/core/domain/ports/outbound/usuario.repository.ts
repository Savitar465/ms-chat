import { Usuario } from "../../models/usuario";
import { UsuarioEntity } from "src/infraestructure/persistance/entities/usuario.entity";

export interface UsuarioRepository {
    save(usuario: Usuario): Promise<UsuarioEntity>;
    findById(id: string): Promise<UsuarioEntity>;
}