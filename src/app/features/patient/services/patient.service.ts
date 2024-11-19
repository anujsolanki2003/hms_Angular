// src/app/patient/patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/app.constants';
import { Patient } from 'src/app/core/interfaces/patient.data';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(API_ENDPOINTS.GET_PATIENTS);
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${API_ENDPOINTS.GET_PATIENTS}/${id}`);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(API_ENDPOINTS.ADD_PATIENT, patient);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(
      `${API_ENDPOINTS.UPDATE_PATIENT}/${id}`,
      patient
    );
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINTS.DELETE_PATIENT}/${id}`);
  }
}
