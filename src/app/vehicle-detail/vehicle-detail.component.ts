import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Detalles del Vehículo</h2>
    <mat-dialog-content>
      <p><strong>Placa:</strong> {{ data.placa }}</p>
      <p><strong>Modelo:</strong> {{ data.modelo }}</p>
      <p><strong>Color:</strong> {{ data.color }}</p>
      <p><strong>Año:</strong> {{ data.anio }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Cerrar</button>
    </mat-dialog-actions>
  `
})
export class VehicleDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<VehicleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}