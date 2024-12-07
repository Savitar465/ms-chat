import { ApiProperty } from '@nestjs/swagger';

export class CrearEventoRequest {
  @ApiProperty()
  usuarioId: string;
  @ApiProperty()
  mensaje: string;
  @ApiProperty()
  tipo: string;
}