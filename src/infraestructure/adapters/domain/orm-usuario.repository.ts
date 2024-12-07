import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { UsuarioRepository } from "src/core/domain/ports/outbound/usuario.repository";
import { UsuarioEntity } from "src/infraestructure/persistance/entities/usuario.entity";
import { Usuario } from "src/core/domain/models/usuario";

@Injectable()
export class OrmUsuarioRepository implements UsuarioRepository {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly userRepository: MongoRepository<UsuarioEntity>,
    ) {
    }

    async save(usuario: Usuario): Promise<UsuarioEntity> {
        const usuarioEntity: UsuarioEntity = {
            _id: usuario.usuarioId,
            username: usuario.username,
            email: usuario.email,
            estado: usuario.estado,
            usu_cre: usuario.usu_cre,
            fec_cre: usuario.fec_cre,
            usu_mod: usuario.usu_mod,
            fec_mod: usuario.fec_mod
        }
        return this.userRepository.save(usuarioEntity)
    }

    findById(id: string): Promise<UsuarioEntity> {
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