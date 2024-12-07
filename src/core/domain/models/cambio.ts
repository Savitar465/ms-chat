import {AggregateRoot} from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import {v4 as uuidv4} from 'uuid';

type Props = {
    detallesEventoId: string
    usuarioId: string
    valorAntiguo: string
    valorNuevo: string
}

export class Cambio extends AggregateRoot {
    @ApiProperty()
    cambioId: string
    @ApiProperty()
    detallesEventoId: string
    @ApiProperty()
    usuarioId: string
    @ApiProperty()
    valorAntiguo: string
    @ApiProperty()
    valorNuevo: string
    @ApiProperty()
    usu_mod: string
    @ApiProperty()
    fec_mod: Date
    @ApiProperty()
    usu_cre: string
    @ApiProperty()
    fec_cre: Date

    constructor(props: {
        cambioId: string
        detallesEventoId: string
        usuarioId: string
        valorAntiguo: string
        valorNuevo: string
        usu_mod: string
        fec_mod: Date
        usu_cre: string
        fec_cre: Date
    }) {
        super();
        this.autoCommit = true;
        this.cambioId = props.cambioId
        this.usuarioId = props.usuarioId
        this.detallesEventoId = props.detallesEventoId
        this.valorAntiguo = props.valorAntiguo
        this.valorNuevo = props.valorNuevo
        this.usu_mod = props.usu_mod
        this.fec_mod = props.fec_mod
        this.usu_cre = props.usu_cre
        this.fec_cre = props.fec_cre
    }
    static async create(props: Props): Promise<Cambio> {
        return new Cambio({
            cambioId: uuidv4(),
            usu_mod: props.usuarioId,
            fec_mod: new Date(),
            usu_cre: props.usuarioId,
            fec_cre: new Date(),
            ...props
        });
    }

}