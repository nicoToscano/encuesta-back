import { Module } from '@nestjs/common';
import { EncuestaController } from './encuestas.controller';
import { EncuestaService } from './encuesta.service';

@Module({
  imports: [],
  controllers: [EncuestaController],
  providers: [EncuestaService],
})
export class EncuestaModule {}
