import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DoctorModel } from '../../models/doctor.interface'
import { ApiService } from '../../services/api/api.service'
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { AppUserModel } from 'src/app/models/app.user.interface';
import { ResponseModel } from '../../models/response.interface'
import { AlertService } from '../../services/alerts/alert.service'

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {

  constructor(private router: Router, private activeRouter: ActivatedRoute, private api: ApiService, private toast: AlertService) { }

  doctorData!: DoctorModel;
  doctorId: any;

  updateForm = new FormGroup({
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    bio: new FormControl(''),
  });

  ngOnInit(): void {
    this.doctorId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getDoctorById(this.doctorId).subscribe((data) => {
      this.doctorData = data.data
      this.updateForm.setValue({
        'email': this.doctorData.appUser!.email!,
        'first_name': this.doctorData.appUser!.first_name!,
        'last_name': this.doctorData.appUser!.last_name!,
        'bio': this.doctorData.bio!
      });
    })
  }

  postForm(form: any) {

    let appUser: AppUserModel = {
      first_name: form['first_name'],
      last_name: form['last_name'],
      email: form['email'],
      genre: this.doctorData.appUser?.genre,
      status: this.doctorData.appUser?.status,
    }
    let doctor: DoctorModel = {
      appUser: appUser,
      latitude: this.doctorData.latitude,
      longitude: this.doctorData.longitude,
      bio: form['bio'],
    }

    console.log(doctor)
    this.api.updateDoctor(doctor, this.doctorId).subscribe((response) => {
      if (response.success) {
        this.toast.showSuccess('Datos modificados correctamente', 'Hecho')
        this.router.navigate(['dashboard']);
      } else {
        this.toast.showError('Hubo un problema al modificar los datos', 'Error')
      }
    });

  }

  backToDashboard(){
    this.router.navigate(['dashboard'])

  }
}
