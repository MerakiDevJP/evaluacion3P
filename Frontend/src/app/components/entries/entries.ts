import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitasService } from '../../services/visitas.service';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entries.html',
  styleUrl: './entries.css',
})
export class Entries {
  public visitasService = inject(VisitasService);
}
