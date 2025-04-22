import { Controller, Get, Post, Body, Param, Put} from '@nestjs/common';
import { EncuestaService } from './encuesta.service'; 
import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';



@Controller('encuestas')
export class EncuestaController {
  supabase: any;
  constructor(private readonly encuestaService: EncuestaService) {}


  @Post('usuarios')
  async crearUsuario(@Body() usuario: CreateUsuarioDto) {
    return this.encuestaService.crearUsuario(usuario);
  }

  @Get('usuarios/:correo')
  async obtenerUsuario(@Param('correo') correo: string) {
    const usuario = await this.encuestaService.getUsuario(correo);
    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }
    return { success: true, mensaje: 'Usuario encontrado', usuario };
  }

  @Get('usuarios')
  async obtenerUsuarios(){
    const usuarios = await this.encuestaService.getUsuarios();
    if (!usuarios) {
      return { success: false, mensaje: 'No hay usuarios registrados' };
    }
    return { usuarios };
  }

  @Post('login')
  async validarUsuario(@Body() body: { correo: string; contrasena: string }) {
    const { correo, contrasena } = body;
    const usuario = await this.encuestaService.getUsuario(correo);

    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }

    if (usuario.contrasena !== contrasena) {
      return { success: false, mensaje: 'Contraseña incorrecta' };
    }

    return { success: true, mensaje: 'Usuario validado', usuario };
  }

  @Put('reset-password')
  async resetPassword(@Body() body: { correo: string; nuevaContrasena: string }) {
    const { correo, nuevaContrasena } = body;
    const usuario = await this.encuestaService.getUsuario(correo);

    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }

    if (usuario.contrasena === nuevaContrasena) {
      return { success: false, mensaje: 'La nueva contraseña no puede ser igual a la anterior' };
    }

    // Actualizar la contraseña del usuario
    const error = await this.encuestaService.updateUsuario(correo, nuevaContrasena);

    if (error) {
      return { success: false, mensaje: 'Error al actualizar la contraseña' };
    }
    return { success: true, mensaje: 'Contraseña actualizada con éxito' };
  }

  @Get('preguntas')
  async obtenerPreguntas() {
    return this.encuestaService.getPreguntas();
  }

  @Get('respuestas/:id')
  async obtenerRespuestas(@Param('id') id: string) {
    return this.encuestaService.getRespuestas(id);
  }

  @Post('respuestas')
  async crearRespuestas(@Body() respuestas: CreateRespuestaDto[]) {
    return this.encuestaService.saveRespuestas(respuestas);
  }

}
