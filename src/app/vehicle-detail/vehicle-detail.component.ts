import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Detalles del Vehículo</h2>
    <mat-dialog-content>
      <p><strong>Placa:</strong> {{ data.placa }}</p>
      <p><strong>Modelo:</strong> {{ modelName }}</p>
      <p><strong>Color:</strong> {{ data.color }}</p>
      <p><strong>Año:</strong> {{ data.anio }}</p>
      <p><strong>Chasis:</strong> {{ data.chasis }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Cerrar</button>
    </mat-dialog-actions>
  `
})
export class VehicleDetailComponent implements OnInit {
  modelName: string = 'Cargando...';

  constructor(
    public dialogRef: MatDialogRef<VehicleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadModelName();
  }

  loadModelName(): void {
    this.vehicleService.getCarModels().subscribe({
      next: (models) => {
        const model = models.find(m => m.id === this.data.modelo_id);
        if (model) {
          this.modelName = `${model.brand} - ${model.name}`;
        } else {
          this.modelName = 'No disponible';
        }
      },
      error: (error) => {
        console.error('Error fetching car models:', error);
        this.modelName = 'No disponible';
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}