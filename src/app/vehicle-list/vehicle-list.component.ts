import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '../vehicle.service';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <h2>Lista de Vehículos</h2>
    <button mat-raised-button color="primary" (click)="openAddDialog()">Agregar Vehículo</button>
    <table mat-table [dataSource]="vehicles">
      <ng-container matColumnDef="placa">
        <th mat-header-cell *matHeaderCellDef>Placa</th>
        <td mat-cell *matCellDef="let vehicle">{{vehicle.placa}}</td>
      </ng-container>
      <ng-container matColumnDef="modelo">
        <th mat-header-cell *matHeaderCellDef>Modelo</th>
        <td mat-cell *matCellDef="let vehicle">{{getModelName(vehicle.modelo_id)}}</td>
      </ng-container>
      <ng-container matColumnDef="color">
        <th mat-header-cell *matHeaderCellDef>Color</th>
        <td mat-cell *matCellDef="let vehicle">{{vehicle.color}}</td>
      </ng-container>
      <ng-container matColumnDef="anio">
        <th mat-header-cell *matHeaderCellDef>Año</th>
        <td mat-cell *matCellDef="let vehicle">{{vehicle.anio}}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Acciones</th>
        <td mat-cell *matCellDef="let vehicle">
          <button mat-icon-button color="primary" (click)="openEditDialog(vehicle)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteVehicle(vehicle.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 120px;
    }
  `]
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];
  carModels: any[] = [];
  displayedColumns: string[] = ['placa', 'modelo', 'color', 'anio', 'actions'];

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
    this.loadCarModels();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        console.log('Vehicles:', this.vehicles);
      },
      error: (error) => console.error('Error fetching vehicles:', error)
    });
  }

  loadCarModels(): void {
    this.vehicleService.getCarModels().subscribe({
      next: (data) => {
        this.carModels = data;
      },
      error: (error) => console.error('Error fetching car models:', error)
    });
  }

  getModelName(modelId: string): string {
    const model = this.carModels.find(m => m.id === modelId);
    return model ? `${model.brand} - ${model.name}` : 'N/A';
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVehicles();
      }
    });
  }

  openEditDialog(vehicle: any): void {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '400px',
      data: vehicle
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVehicles();
      }
    });
  }

  deleteVehicle(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => {
          this.loadVehicles();
        },
        error: (error) => console.error('Error deleting vehicle:', error)
      });
    }
  }
}