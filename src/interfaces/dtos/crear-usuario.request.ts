import { ApiProperty } from "@nestjs/swagger"

export class CrearUsuarioRequest {
    @ApiProperty()
    username: string
    @ApiProperty()
    email: string
    @ApiProperty()
    estado: string
}