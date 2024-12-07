import { ApiProperty } from '@nestjs/swagger';

export class CrearCambioRequest {
  @ApiProperty()
  detallesEventoId: string;
  @ApiProperty()
  usuarioId: string;
  @ApiProperty()
  valorAntiguo: string;
  @ApiProperty()
  valorNuevo: string;
}