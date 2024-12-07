import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity('mensajes')
export class MensajeEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()
    usuarioId: string;

    @Column() 
    contenido: string;

    @Column()
    fecha_hora_envio: Date;

    @Column()
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
