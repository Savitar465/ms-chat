import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('usuarios')
export class UsuarioEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    estado: string;

    @Column()
    fec_cre: Date;

    @Column()
    fec_mod: Date;

    @Column()
    usu_cre: string;

    @Column()
    usu_mod: string;
}
