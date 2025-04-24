import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

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
export class QuestionService {

    async getQuesitonByType(typeQuestion: string) {
        const { data, error } = await supabase
        .from('preguntas_' + typeQuestion)
        .select('*');
    
        if (error) throw error;
        return data;
    }
    
  
}
