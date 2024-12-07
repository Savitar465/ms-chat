import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity('eventos')
export class EventoEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    usuarioId: string;

    @Column()
    mensaje: string;

    @Column({default: false})
    tipo: string;

    @Column()
    fec_cre: Date;

    @Column()
    fec_mod: Date;

    @Column()
    usu_cre: string;

    @Column()
    usu_mod: string;
}
