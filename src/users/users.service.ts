import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { CreateUserDto } from './dto/create-user.dto';

config();

const supabaseUrl = process.env.VITE_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase environment variables are missing. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

@Injectable()
export class UsersService {

  async createUser(user: CreateUserDto) {
    // Verificar si el correo ya está registrado
    const existingUser = await this.getUser(user.correo);
    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    // Crear el usuario si no existe
    const { data, error } = await supabase
      .from('usuarios')
      .insert([user])
      .select(); // 👈 Esto le dice a Supabase que devuelva los datos insertados
  
    if (error) throw new Error(error.message);
    if (!data) throw new Error('Failed to create user: data is null');
    return data[0]; // Devuelve el primer usuario creado
  }

  async getUser(correo: string) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', correo)
      .single(); // 👈 Esto le dice a Supabase que devuelva un solo registro
  
    if (error || !data) return null;
    return data;
  }

  async getUsers() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    return data;
  }

  async updateUsers(correo: string, nuevaContrasena: string) {
    const { data, error } = await supabase
      .from('usuarios')
      .update({ contrasena: nuevaContrasena })
      .eq('correo', correo)
      .single(); // 👈 Esto le dice a Supabase que devuelva un solo registro
      
    if (error || !data) return null;
    return data;

  }
  
}
