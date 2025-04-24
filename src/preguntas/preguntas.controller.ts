import { Controller, Get, Post, Body, Param, Put} from '@nestjs/common';
import { QuestionService } from './preguntas.service';

@Controller(':tipo_encuesta/preguntas')
export class PreguntasController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  getPreguntasByType(@Param('tipo_encuesta') tipo: string) {
    return this.questionService.getQuesitonByType(tipo);
  }
  
}