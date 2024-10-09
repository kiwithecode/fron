import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-circulation-check',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Check Circulation</h2>
    <form (ngSubmit)="checkCirculation()">
      <div>
        <label for="placa">Placa:</label>
        <input id="placa" [(ngModel)]="placa" name="placa" required>
      </div>
      <div>
        <label for="date">Date:</label>
        <input id="date" [(ngModel)]="date" name="date" type="date" required>
      </div>
      <button type="submit">Check Circulation</button>
    </form>
    <p *ngIf="result !== null">
      The vehicle {{ canCirculate ? 'can' : 'cannot' }} circulate on the specified date.
    </p>
  `,
  styles: []
})
export class CirculationCheckComponent {
  placa: string = '';
  date: string = '';
  result: boolean | null = null;

  constructor(private vehicleService: VehicleService) {}

  checkCirculation(): void {
    this.vehicleService.checkCirculation(this.placa, this.date).subscribe({
      next: (data) => this.result = data,
      error: (error) => console.error('Error checking circulation', error)
    });
  }

  get canCirculate(): boolean {
    return this.result === true;
  }
}