import {Column, Entity, ObjectIdColumn} from "typeorm";

@Entity('cambios')
export class CambioEntity {
    @ObjectIdColumn()
    _id: string;

    @Column()   
    detalles_evento_detalles_evento_id: string;

    @Column()
    valor_antiguo: string;

    @Column({default: false})
    valor_nuevo: string;

    @Column()
    usuario_id: string;

    @Column()
    fec_cre: Date;

    @Column()
    fec_mod: Date;

    @Column()
    usu_cre: string;

    @Column()
    usu_mod: string;
}