import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { CreateRespuestaDto } from './dto/create-answer.dto';

config();

const supabaseUrl = process.env.VITE_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Supabase environment variables are missing. Please check your .env file.',
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

@Injectable()
export class AnswersService {
  async saveAnswers(
    respuestas: CreateRespuestaDto[],
    tipo_encuesta: string,
  ) {
    const { data, error } = await supabase
      .from('respuestas_' + tipo_encuesta)
      .insert(respuestas);

    if (error) throw new Error(error.message);

    return data;
  }

  async getAllAnswers(tipo_encuesta: string) {
    const { data, error } = await supabase.from('respuestas_'+tipo_encuesta).select('*');
    if (error) throw error;
    return data;
  }

  async getAnswers(usuario_id: string, tipo_encuesta: string) {
    const { data, error } = await supabase
      .from('respuestas_' + tipo_encuesta)
      .select('*')
      .eq('usuario_id', usuario_id);

    if (error) throw error;
    return data;
  }
}
