import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRespuestaDto } from 'src/respuestas/dto/create-answer.dto';
import { AnswersService } from './answers.service';

@Controller('encuesta/:tipo_encuesta/answers')
export class RespuestasController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async saveAnswers(
    @Body() respuestas: CreateRespuestaDto[],
    @Param('tipo_encuesta') tipo_encuesta: string,
  ) {
    return this.answersService.saveAnswers(respuestas, tipo_encuesta);
  }

  @Get()
  async getAllAnswers(@Param('tipo_encuesta') tipo_encuesta: string) {
    return this.answersService.getAllAnswers(tipo_encuesta);
  }

  @Get(':usuario_id')
  async getAnswers(
    @Param('usuario_id') usuario_id: string,
    @Param('tipo_encuesta') tipo_encuesta: string
  ){
    return this.answersService.getAnswers(usuario_id, tipo_encuesta);
  }
}
