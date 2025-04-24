import { IsUUID, IsString } from 'class-validator';

export class CreateRespuestaDto {
  @IsUUID()
  usuario_id: string;

  @IsUUID()
  pregunta_id: string;

  @IsString()
  respuesta: string;
}
