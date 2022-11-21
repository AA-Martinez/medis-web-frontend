import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../../services/api/api.service'
import { LoginModel } from '../../models/login.interface'

import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorStatus: boolean = false;
  errorMessage: any = "";

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private api: ApiService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  onLogin(form: any) {
    this.api.login(form).subscribe((response) => {
      let token = response.headers.get("Authorization");
      if (response.status == 200) {
        let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));
        if (decodedJWT.role == 4) {
          console.log('role: ' + decodedJWT.role);
          localStorage.setItem("token", token!.split(" ")[1]);
          this.router.navigate(['dashboard']);
        } else {
          this.errorStatus = true;
          this.errorMessage = "Debe ingresar con una cuenta de administrador"
        }
      }
    },
      (error) => {
        this.errorStatus = true;
        this.errorMessage = "Correo o contraseña incorrectos. Intentelo de nuevo "
      }
    );
  }

}
