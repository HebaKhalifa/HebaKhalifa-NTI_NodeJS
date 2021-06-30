import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSubmitted:boolean = false
  registerResponse :any = null
  msg : any = null
  user = new FormGroup({
      userName:new FormControl('', [Validators.required]),
      phone:new FormControl(),
      email:new FormControl('', [Validators.email, Validators.required]),
      password:new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      address:new FormControl('')
    })
  constructor() { }

  ngOnInit(): void {
  }

}
