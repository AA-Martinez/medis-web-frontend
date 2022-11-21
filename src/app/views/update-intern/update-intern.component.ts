import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserModel } from 'src/app/models/app.user.interface';
import { InternModel } from 'src/app/models/intern.interface';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-update-intern',
  templateUrl: './update-intern.component.html',
  styleUrls: ['./update-intern.component.css']
})
export class UpdateInternComponent {
  constructor(private router: Router, private activeRouter: ActivatedRoute, private api: ApiService, private toast: AlertService) { }

  internData!: InternModel;
  internId: any;

  updateForm = new FormGroup({
    email: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  ngOnInit(): void {
    this.internId = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getInternById(this.internId).subscribe((data) => {
      this.internData = data.data
      this.updateForm.setValue({
        'email': this.internData.appUser!.email!,
        'first_name': this.internData.appUser!.first_name!,
        'last_name': this.internData.appUser!.last_name!,
      });
    })
  }

  postForm(form: any) {

    let appUser: AppUserModel = {
      first_name: form['first_name'],
      last_name: form['last_name'],
      email: form['email'],
      genre: this.internData.appUser?.genre,
      status: this.internData.appUser?.status,
    }
    let intern : InternModel = {
      appUser:appUser,
      hospital:this.internData.hospital
    }

    console.log(intern)
    this.api.updateIntern(intern, this.internId).subscribe((response) => {
      if (response.success) {
        this.toast.showSuccess('Datos modificados correctamente', 'Hecho')
        this.router.navigate(['dashboard']);
      } else {
        this.toast.showError('Hubo un problema al modificar los datos', 'Error')
      }
    });

  }

  backToDashboard() {
    this.router.navigate(['dashboard'])

  }
}
