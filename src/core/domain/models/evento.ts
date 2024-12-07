import {AggregateRoot} from "@nestjs/cqrs";
import {v4 as uuidv4} from 'uuid';

type Props = {
    usuarioId: string
    mensaje: string
    tipo: string
}

export class Evento extends AggregateRoot {
    eventoId: string
    usuarioId: string
    mensaje: string
    tipo: string
    usu_mod: string
    fec_mod: Date
    usu_cre: string
    fec_cre: Date

    constructor(props: {
        eventoId: string
        usuarioId: string
        mensaje: string
        tipo: string
        usu_mod: string
        fec_mod: Date
        usu_cre: string
        fec_cre: Date
    }) {
        super();
        this.autoCommit = true;
        this.eventoId = props.eventoId
        this.usuarioId = props.usuarioId
        this.mensaje = props.mensaje
        this.tipo = props.tipo
        this.usu_mod = props.usu_mod
        this.fec_mod = props.fec_mod
        this.usu_cre = props.usu_cre
        this.fec_cre = props.fec_cre
    }

    static async create(props: Props): Promise<Evento> {
        return new Evento({
            eventoId: uuidv4(),
            usu_mod: props.usuarioId,
            fec_mod: new Date(),
            usu_cre: props.usuarioId,
            fec_cre: new Date(),
            ...props
        });
    }

}