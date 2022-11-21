import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserModel } from 'src/app/models/app.user.interface';
import { HospitalModel } from 'src/app/models/hospital.interface';
import { RegisterInternModel } from 'src/app/models/register.intern.interface';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-new-intern',
  templateUrl: './new-intern.component.html',
  styleUrls: ['./new-intern.component.css']
})
export class NewInternComponent {
  constructor(private router: Router, private activeRouter: ActivatedRoute, private api: ApiService, private toast: AlertService, private fb: FormBuilder) { }

  hospitals?: HospitalModel[];
  selectedHospital?: HospitalModel;

  ngOnInit(): void {
    this.api.getAllHospitals().subscribe((data) => {
      this.hospitals = data.data as HospitalModel[];
    })
  }

  onChange() {
    console.log(this.selectedHospital?.id);
  }

  newForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.minLength(10)]],
    last_name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    hospital: ['']
  });



  postForm(form: any) {
    let appUser: AppUserModel = {
      first_name: form["first_name"],
      last_name: form['last_name'],
      email: form['email'],
      password: form['password'],
      status: 0,
      role: 3,
    }

    let intern: RegisterInternModel = {
      appUser: appUser,
      hospital_id: this.selectedHospital?.id
    }

    this.api.registerIntern(intern).subscribe((response) => {
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
