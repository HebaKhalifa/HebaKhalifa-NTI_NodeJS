import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private global: GlobalService, private router: Router) {
    this.loadProfile();
  }

  ngOnInit(): void {}
  logoutResult: any;
  user: any;
  loadProfile() {
    if (localStorage.getItem('token')) {
      this.global.profile().subscribe((res) => {
        this.user = res;
        console.log(res);
      });
    } else {
      this.router.navigateByUrl('');
    }
  }

  logout() {
    this.global.logout().subscribe(
      (res) => {
        // this.loginResult = res;
        console.log(res);
      },
      (e) => {
        console.log(e);
      },
      () => {
        if (!this.logoutResult.status) {
          this.logoutResult = this.logoutResult.data.message;
        } else {
          localStorage.removeItem('token');
          this.router.navigateByUrl('');
        }
      }
    );
  }
}
