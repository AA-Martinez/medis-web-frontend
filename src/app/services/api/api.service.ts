import { Injectable } from '@angular/core';
import { ResponseModel } from '../../models/response.interface';
import { LoginModel } from '../../models/login.interface';
import { DoctorModel } from '../../models/doctor.interface'
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs'
import { AppUserModel } from 'src/app/models/app.user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://medisbackendaws-env.eba-azpy8292.us-east-1.elasticbeanstalk.com/";

  constructor(private http: HttpClient) { }

  login(form: LoginModel) {
    let direction = this.url + "app-user/auth/login";
    return this.http.post(direction, form, { observe: 'response' });
  }

  getDoctorById(id: any): Observable<ResponseModel> {
    let direction = this.url + "doctors/" + id;
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<ResponseModel>(direction, requestOptions);
  }

  getInternById(id: any): Observable<ResponseModel> {
    let direction = this.url + "interns/" + id;
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<ResponseModel>(direction, requestOptions);
  }

  getAllDoctors(): Observable<ResponseModel> {
    let direction = this.url + "doctors/all";
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<ResponseModel>(direction, requestOptions);
  }

  getAllInterns(): Observable<ResponseModel> {
    let direction = this.url + "interns/all";
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<ResponseModel>(direction, requestOptions);
  }

  updateDoctor(doctor: any, id: any): Observable<ResponseModel> {
    let direction = this.url + "doctors/updateDoctor/" + id
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.put<ResponseModel>(direction, doctor, requestOptions);
  }

  updateIntern(intern: any, id: any): Observable<ResponseModel> {
    let direction = this.url + "interns/updateIntern/" + id
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.put<ResponseModel>(direction, intern, requestOptions);
  }


  getAllSpecialties(): Observable<ResponseModel> {
    let direction = this.url + "specialties/all";
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<ResponseModel>(direction, requestOptions);
  }

  getAllHospitals(): Observable<ResponseModel> {
    let direction = this.url + "hospitals/all";
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.get<ResponseModel>(direction, requestOptions);
  }

  registerDoctor(doctor: any): Observable<ResponseModel> {
    let direction = this.url + "doctors/sign-in";
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.post<ResponseModel>(direction, doctor, requestOptions);
  }

  registerIntern(intern: any): Observable<ResponseModel> {
    let direction = this.url + "interns/sign-in";
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.http.post<ResponseModel>(direction, intern, requestOptions);
  }


} 
