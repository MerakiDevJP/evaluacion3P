import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Visita {
  _id?: string;
  nombre: string;
  motivo: string;
  fechaRegistro?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/visitas';

  private visitasSubject = new BehaviorSubject<Visita[]>([]);
  public visitas$ = this.visitasSubject.asObservable();

  constructor() {
    this.cargarVisitas();
  }

  cargarVisitas() {
    this.http.get<Visita[]>(this.apiUrl).subscribe({
      next: (data) => this.visitasSubject.next(data),
      error: (err) => console.error('Error al cargar visitas:', err)
    });
  }

  registrarVisita(visita: Visita): Observable<any> {
    return this.http.post<any>(this.apiUrl, visita).pipe(
      tap(() => this.cargarVisitas()) // Recargar las visitas después de registrar una nueva
    );
  }
}
