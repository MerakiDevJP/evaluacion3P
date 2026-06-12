import { Component, inject } from '@angular/core';
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

  visita: Visita = {
    nombre: '',
    motivo: ''
  };

  registrar() {
    if (this.visita.nombre && this.visita.motivo) {
      this.visitasService.registrarVisita(this.visita).subscribe({
        next: (res) => {
          console.log(res.mensaje);
          // Limpiar formulario
          this.visita = { nombre: '', motivo: '' };
        },
        error: (err) => console.error('Error al registrar', err)
      });
    }
  }
}
