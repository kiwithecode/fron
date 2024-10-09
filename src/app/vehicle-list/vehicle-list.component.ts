import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Vehicle List</h2>
    <ul>
      <li *ngFor="let vehicle of vehicles">
        {{ vehicle.placa }} - {{ vehicle.modelo }}
      </li>
    </ul>
  `
})
export class VehicleListComponent implements OnInit {
  vehicles: any[] = [];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        console.log('Vehicles:', this.vehicles);  // Para depuración
      },
      error: (error) => console.error('Error fetching vehicles:', error)
    });
  }
}