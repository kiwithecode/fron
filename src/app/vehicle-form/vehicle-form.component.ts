import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEditing ? 'Editar' : 'Agregar' }} Vehículo</h2>
    <mat-dialog-content>
      <form [formGroup]="vehicleForm">
        <mat-form-field>
          <mat-label>Placa</mat-label>
          <input matInput formControlName="placa" required>
          <mat-error *ngIf="vehicleForm.get('placa')?.hasError('required')">La placa es requerida</mat-error>
          <mat-error *ngIf="vehicleForm.get('placa')?.hasError('pattern')">Formato inválido. Debe ser PDK-1234</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Modelo</mat-label>
          <mat-select formControlName="modelo" required>
            <mat-option *ngFor="let model of carModels" [value]="model">
              {{model}}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="vehicleForm.get('modelo')?.hasError('required')">El modelo es requerido</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Color</mat-label>
          <input matInput formControlName="color" required>
          <mat-error *ngIf="vehicleForm.get('color')?.hasError('required')">El color es requerido</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Año</mat-label>
          <input matInput formControlName="anio" type="number" required>
          <mat-error *ngIf="vehicleForm.get('anio')?.hasError('required')">El año es requerido</mat-error>
          <mat-error *ngIf="vehicleForm.get('anio')?.hasError('min') || vehicleForm.get('anio')?.hasError('max')">
            El año debe estar entre 1900 y {{ currentYear }}
          </mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Chasis</mat-label>
          <input matInput formControlName="chasis" required [readonly]="!isEditing">
          <mat-error *ngIf="vehicleForm.get('chasis')?.hasError('required')">El chasis es requerido</mat-error>
          <mat-error *ngIf="vehicleForm.get('chasis')?.hasError('pattern')">Formato de chasis inválido</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="vehicleForm.invalid">
        {{ isEditing ? 'Actualizar' : 'Crear' }}
      </button>
    </mat-dialog-actions>
  `
})
export class VehicleFormComponent implements OnInit {
  vehicleForm: FormGroup;
  isEditing = false;
  currentYear = new Date().getFullYear();
  carModels: string[] = [
    'Toyota Corolla',
    'Honda Civic',
    'Ford F-150',
    'Chevrolet Silverado',
    'Nissan Altima',
    'Honda Accord',
    'Toyota Camry',
    'Jeep Grand Cherokee',
    'Ford Escape',
    'Toyota RAV4',
    'Honda CR-V',
    'Chevrolet Equinox',
    'Nissan Rogue',
    'Ford Explorer',
    'Subaru Outback'
  ];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle
  ) {
    this.vehicleForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}$/)]],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
      anio: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      chasis: ['', [Validators.required, Validators.pattern(/^[A-HJ-NPR-Z0-9]{17}$/)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEditing = true;
      this.vehicleForm.patchValue(this.data);
    } else {
      // Generate random chasis for new vehicles
      this.vehicleForm.get('chasis')?.setValue(this.generateRandomChasis());
    }
  }

  generateRandomChasis(): string {
    const characters = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 17; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const vehicle: Vehicle = this.vehicleForm.value;
      if (this.isEditing) {
        vehicle.id = this.data.id;
        this.vehicleService.updateVehicle(vehicle.id!, vehicle).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => console.error('Error updating vehicle:', error)
        });
      } else {
        this.vehicleService.createVehicle(vehicle).subscribe({
          next: () => this.dialogRef.close(true),
          error: (error) => console.error('Error creating vehicle:', error)
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}