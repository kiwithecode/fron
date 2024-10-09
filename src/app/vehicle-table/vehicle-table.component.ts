import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VehicleService } from '../vehicle.service';
import { VehicleDetailComponent } from '../vehicle-detail/vehicle-detail.component';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';
import { Vehicle } from '../models/vehicle.model';

@Component({
    selector: 'app-vehicle-table',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
    template: `
        <div class="container">
            <h2>Vehículos</h2>
            <div class="button-container">
                <button mat-raised-button color="primary" (click)="openAddDialog()">Agregar Vehículo</button>
            </div>
            <table mat-table [dataSource]="vehicles">
                <ng-container matColumnDef="placa">
                    <th mat-header-cell *matHeaderCellDef>Placa</th>
                    <td mat-cell *matCellDef="let vehicle">{{vehicle.placa}}</td>
                </ng-container>
                <ng-container matColumnDef="modelo">
                    <th mat-header-cell *matHeaderCellDef>Modelo</th>
                    <td mat-cell *matCellDef="let vehicle">{{vehicle.modelo}}</td>
                </ng-container>
                <ng-container matColumnDef="color">
                    <th mat-header-cell *matHeaderCellDef>Color</th>
                    <td mat-cell *matCellDef="let vehicle">{{vehicle.color}}</td>
                </ng-container>
                <ng-container matColumnDef="anio">
                    <th mat-header-cell *matHeaderCellDef>Año</th>
                    <td mat-cell *matCellDef="let vehicle">{{vehicle.anio}}</td>
                </ng-container>
                <ng-container matColumnDef="chasis">
                    <th mat-header-cell *matHeaderCellDef>Chasis</th>
                    <td mat-cell *matCellDef="let vehicle">{{vehicle.chasis}}</td>
                </ng-container>
                <ng-container matColumnDef="noCirula">
                    <th mat-header-cell *matHeaderCellDef>No Circula</th>
                    <td mat-cell *matCellDef="let vehicle">{{getNoCiruclaDay(vehicle.placa)}}</td>
                </ng-container>
                <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Acciones</th>
                    <td mat-cell *matCellDef="let vehicle">
                        <button mat-button color="primary" (click)="openViewDialog(vehicle)">Ver</button>
                        <button mat-button color="accent" (click)="openEditDialog(vehicle)">Editar</button>
                        <button mat-button color="warn" (click)="deleteVehicle(vehicle.id)">Eliminar</button>
                    </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
        </div>
    `,
    styles: [`
        .container {
            padding: 20px;
        }
        .button-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
        }
        button {
            margin-right: 8px;
        }
    `]
})
export class VehicleTableComponent implements OnInit {
    vehicles: Vehicle[] = [];
    displayedColumns: string[] = ['placa', 'modelo', 'color', 'anio', 'chasis', 'noCirula', 'actions'];

    constructor(
        private vehicleService: VehicleService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadVehicles();
    }

    loadVehicles(): void {
        this.vehicleService.getVehicles().subscribe({
            next: (data) => this.vehicles = data,
            error: (error) => console.error('Error fetching vehicles:', error)
        });
    }

    getNoCiruclaDay(placa: string): string {
        const lastDigit = parseInt(placa.slice(-1));
        switch(lastDigit) {
            case 1:
            case 2:
                return 'Lunes';
            case 3:
            case 4:
                return 'Martes';
            case 5:
            case 6:
                return 'Miércoles';
            case 7:
            case 8:
                return 'Jueves';
            case 9:
            case 0:
                return 'Viernes';
            default:
                return 'N/A';
        }
    }

    openViewDialog(vehicle: Vehicle): void {
        this.dialog.open(VehicleDetailComponent, {
            width: '400px',
            data: vehicle
        });
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

    openEditDialog(vehicle: Vehicle): void {
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
                next: () => this.loadVehicles(),
                error: (error) => console.error('Error deleting vehicle:', error)
            });
        }
    }
}