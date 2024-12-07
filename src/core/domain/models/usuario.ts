import { AggregateRoot } from "@nestjs/cqrs";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from 'uuid';

type Props = {
    username: string
    email: string
    estado: string
}

export class Usuario extends AggregateRoot {
    @ApiProperty()
    usuarioId: string
    @ApiProperty()
    username: string
    @ApiProperty()
    email: string
    @ApiProperty()
    estado: string
    @ApiProperty()
    usu_mod: string
    @ApiProperty()
    fec_mod: Date
    @ApiProperty()
    usu_cre: string
    @ApiProperty()
    fec_cre: Date

    constructor(props: {
        usuarioId: string
        username: string
        email: string
        estado: string
        usu_mod: string
        fec_mod: Date
        usu_cre: string
        fec_cre: Date
    }) {
        super();
        this.autoCommit = true;
        this.usuarioId = props.usuarioId
        this.username = props.username
        this.email = props.email
        this.estado = props.estado
        this.usu_mod = props.usu_mod
        this.fec_mod = props.fec_mod
        this.usu_cre = props.usu_cre
        this.fec_cre = props.fec_cre
    }
    static async create(props: Props): Promise<Usuario> {
        return new Usuario({
            usuarioId: uuidv4(),
            usu_mod: props.username,
            fec_mod: new Date(),
            usu_cre: props.username,
            fec_cre: new Date(),
            ...props
        });
    }
}