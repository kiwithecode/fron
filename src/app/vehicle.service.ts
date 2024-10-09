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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.supabaseUrl, { headers: this.getHeaders() });
  }

  getVehicle(id: string): Observable<any> {
    return this.http.get<any>(`${this.supabaseUrl}?id=eq.${id}`, { headers: this.getHeaders() });
  }

  createVehicle(vehicle: any): Observable<any> {
    return this.http.post<any>(this.supabaseUrl, vehicle, { headers: this.getHeaders() });
  }

  updateVehicle(id: string, vehicle: any): Observable<any> {
    return this.http.patch<any>(`${this.supabaseUrl}?id=eq.${id}`, vehicle, { headers: this.getHeaders() });
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete<any>(`${this.supabaseUrl}?id=eq.${id}`, { headers: this.getHeaders() });
  }
}