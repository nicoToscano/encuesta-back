import { Module } from '@nestjs/common';
import { UsuariosController } from './users/users.controller';
import { PreguntasController } from './preguntas/preguntas.controller';
import { RespuestasController } from './respuestas/answers.controller';

import { UsersService } from './users/users.service';
import { QuestionService } from './preguntas/preguntas.service';
import { AnswersService } from './respuestas/answers.service';

@Module({
  imports: [],
  controllers: [UsuariosController, PreguntasController, RespuestasController],
  providers: [UsersService, QuestionService, AnswersService],
})
export class AppModule {}
