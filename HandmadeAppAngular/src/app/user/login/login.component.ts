import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = new FormGroup({
    email: new FormControl(), //, [Validators.email, Validators.required]),
    password: new FormControl(), //, [Validators.required]),
    // Validators.minLength(6),
    // Validators.maxLength(20),
    // ]),
  });

  get email() {
    return this.user.get('email');
  }
  get password() {
    return this.user.get('password');
  }

  loginResult: any;
  errorMessage = null;
  constructor(private global: GlobalService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.global.login(this.user.value).subscribe(
      (res) => {
        this.loginResult = res;
        console.log(res.data);
      },
      (e) => {},
      () => {
        if (!this.loginResult.status) {
          this.errorMessage = this.loginResult.data.message;
        } else {
          let token = this.loginResult.data.token;
          localStorage.setItem('token', token);
          this.router.navigateByUrl('profile');
        }
      }
    );
  }
}
