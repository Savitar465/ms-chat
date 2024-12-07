import {AggregateRoot} from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';

type Props = {
    usuarioId: string
    contenido: string
    fecha_hora_envio: Date
    tipo: string
}

export class Mensaje extends AggregateRoot {
    @ApiProperty()
    mensajeId: string
    @ApiProperty()
    usuarioId: string
    @ApiProperty()
    contenido: string
    @ApiProperty()
    fecha_hora_envio: Date
    @ApiProperty()
    tipo: string
    @ApiProperty()
    usu_mod: string
    @ApiProperty()
    fec_mod: Date
    @ApiProperty()
    usu_cre: string
    @ApiProperty()
    fec_cre: Date

    constructor(props: {
        mensajeId: string
        usuarioId: string
        contenido: string
        fecha_hora_envio: Date
        tipo: string
        usu_mod: string
        fec_mod: Date
        usu_cre: string
        fec_cre: Date
    }) {
        super();
        this.autoCommit = true;
        this.mensajeId = props.mensajeId
        this.usuarioId = props.usuarioId
        this.contenido = props.contenido
        this.fecha_hora_envio = props.fecha_hora_envio
        this.tipo = props.tipo
        this.usu_mod = props.usu_mod
        this.fec_mod = props.fec_mod
        this.usu_cre = props.usu_cre
        this.fec_cre = props.fec_cre
    }
    static async create(props: Props): Promise<Mensaje> {
        return new Mensaje({
            mensajeId: uuidv4(),
            usu_mod: props.usuarioId,
            fec_mod: new Date(),
            usu_cre: props.usuarioId,
            fec_cre: new Date(),
            ...props
        });
    }

}