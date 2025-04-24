import { Controller, Get, Post, Body, Param, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsuariosController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  async createUser(@Body() usuario: CreateUserDto) {
    return this.usersService.createUser(usuario);
  }

  @Post('login')
  async validateUser(@Body() body: { correo: string; contrasena: string }) {
    const { correo, contrasena } = body;
    const usuario = await this.usersService.getUser(correo);

    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }

    if (usuario.contrasena !== contrasena) {
      return { success: false, mensaje: 'Contraseña incorrecta' };
    }

    return { success: true, mensaje: 'Usuario validado', usuario };
  }

  @Get('get-users')
  async getUsers() {
    const usuarios = await this.usersService.getUsers();
    if (!usuarios) {
      return { success: false, mensaje: 'No hay usuarios registrados' };
    }
    return { usuarios };
  }

  @Get('get-user/:email')
  async getUser(@Param('email') correo: string) {
    const usuario = await this.usersService.getUser(correo);
    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }
    return { success: true, mensaje: 'Usuario encontrado', usuario };
  }

  @Put('reset-password')
  async resetPassword(@Body() body: { correo: string; nuevaContrasena: string }) {
    const { correo, nuevaContrasena } = body;
    const usuario = await this.usersService.getUser(correo);

    if (!usuario) {
      return { success: false, mensaje: 'Usuario no encontrado' };
    }

    if (usuario.contrasena === nuevaContrasena) {
      return { success: false, mensaje: 'La nueva contraseña no puede ser igual a la anterior' };
    }

    // Actualizar la contraseña del usuario
    const error = await this.usersService.updateUsers(correo, nuevaContrasena);

    if (error) {
      return { success: false, mensaje: 'Error al actualizar la contraseña' };
    }
    return { success: true, mensaje: 'Contraseña actualizada con éxito' };
  }
}
