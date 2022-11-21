import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DoctorModel } from '../../models/doctor.interface'
import { ApiService } from '../../services/api/api.service'
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { AppUserModel } from 'src/app/models/app.user.interface';
import { ResponseModel } from '../../models/response.interface'
import { AlertService } from '../../services/alerts/alert.service'
import { SpecialtyModel } from 'src/app/models/specialty.interface';
import { RegisterDoctorModel } from 'src/app/models/register.doctor.interface';

@Component({
  selector: 'app-new-doctor',
  templateUrl: './new-doctor.component.html',
  styleUrls: ['./new-doctor.component.css']
})
export class NewDoctorComponent implements OnInit {

  constructor(private router: Router, private activeRouter: ActivatedRoute, private api: ApiService, private toast: AlertService, private fb: FormBuilder) { }

  specialties?: SpecialtyModel[];
  selectedSpecialty?: SpecialtyModel;

  ngOnInit(): void {
    this.api.getAllSpecialties().subscribe((data) => {
      this.specialties = data.data as SpecialtyModel[];
      this.specialties.forEach(element => {
        console.log(element.id)
      });
    })
  }

  onChange() {
    console.log(this.selectedSpecialty?.id);
  }

  newForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(10)]],
    last_name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    specialty: ['']
  });



  postForm(form: any) {
    let appUser: AppUserModel = {
      first_name: form["first_name"],
      last_name: form['last_name'],
      email: form['email'],
      password: form['password'],
      status: 0,
      role: 2,
    }

    let doctor: RegisterDoctorModel = {
      appUser: appUser,
      specialty: this.selectedSpecialty?.id
    }

    this.api.registerDoctor(doctor).subscribe((response) => {
      if (response.success) {
        this.toast.showSuccess('Usuario creado con exito', 'Hecho')
        this.router.navigate(['dashboard']);
      } else {
        this.toast.showError('Hubo un problema al crear el usuario', 'Error')
      }
    })

  }

  backToDashboard() {
    this.router.navigate(['dashboard'])
  }
}
