import { ApiProperty } from '@nestjs/swagger';

export class CrearMensajeRequest {
  @ApiProperty()
  usuarioId: string;
  @ApiProperty()
  contenido: string;
  @ApiProperty()
  fecha_hora_envio: Date;
  @ApiProperty()
  tipo: string;
}