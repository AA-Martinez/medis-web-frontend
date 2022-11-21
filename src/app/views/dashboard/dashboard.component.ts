import { Component, OnInit } from '@angular/core';
import { DoctorModel } from 'src/app/models/doctor.interface';
import { SpecialtyModel } from 'src/app/models/specialty.interface';

import { ApiService } from '../../services/api/api.service'
import { Router } from '@angular/router'
import { InternModel } from 'src/app/models/intern.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  doctors?: DoctorModel[];
  specialties?: SpecialtyModel[];
  interns?: InternModel[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAllDoctors().subscribe((data) => {
      this.doctors = data.data as DoctorModel[];
    });

    this.api.getAllSpecialties().subscribe((data) => {
      this.specialties = data.data as SpecialtyModel[];
    });

    this.api.getAllInterns().subscribe((data) => {
      this.interns = data.data as InternModel[];
    });
  }

  updateDoctor(id: any) {
    console.log(id);
    this.router.navigate(['update-doctor', id])
  }

  updateIntern(id: any) {
    console.log(id);
    this.router.navigate(['update-intern', id])
  }

  registerDoctor() {
    this.router.navigate(["new-doctor"])
  }

  registerIntern() {
    this.router.navigate(["new-intern"])
  }

}
