import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VisitasService, Visita } from '../../services/visitas.service';

@Component({
  selector: 'app-form-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-users.html',
  styleUrl: './form-users.css',
})
export class FormUsers {
  private visitasService = inject(VisitasService);

  // 2. Variable reactiva para controlar el mensaje en la pantalla
  mensajeExito = signal<string | null>(null);
  mensajeError = signal<string | null>(null);

  visita: Visita = {
    nombre: '',
    motivo: ''
  };

  registrar() {
    if (this.visita.nombre && this.visita.motivo) {
      // Limpiamos el error de campos vacíos si ya los llenó
      this.mensajeError.set(null);

      this.visitasService.registrarVisita(this.visita).subscribe({
        next: (res) => {
          // Mantiene tu consola de éxito
          console.log(res.mensaje);

          this.mensajeExito.set(res.mensaje || '¡Visita registrada con éxito!');
          this.visita = { nombre: '', motivo: '' };
          setTimeout(() => this.mensajeExito.set(null), 3000);
        },
        error: (err) => {
          // 👇 Mantiene intacta tu consola de error técnico en rojo
          console.error('Error al registrar', err);
        }
      });
    } else {
      // Alerta visual para el usuario en la pantalla si falta un campo
      this.mensajeError.set('⚠️ Por favor, llene todos los campos del formulario.');
      setTimeout(() => this.mensajeError.set(null), 3000);
    }
  }
}
