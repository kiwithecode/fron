import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private supabaseUrl = 'https://xzbrmmlcmlqtlmnjlcnz.supabase.co/rest/v1/vehiculos';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6YnJtbWxjbWxxdGxtbmpsY256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NzY4NDIsImV4cCI6MjA0MzU1Mjg0Mn0.QyFIgGcr4kI-ojC8cXj3gTkC0CBXjaWvTwueAWoMOS0';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`);
  }

  getVehicle(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/vehicles/${id}`);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, vehicle);
  }

  updateVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/vehicles/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vehicles/${id}`);
  }

  getCarModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/car-models`);
  }
}