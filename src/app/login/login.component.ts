import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../shared/UserApi.service';
import { UserData } from '../SignUp.Model';
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formValue!: FormGroup;
  constructor(private formBuilder: FormBuilder,private api:UserApiService,private router: Router) { 
  }
  errorMessage:string='';
  isValidUser:boolean = true;

  ngOnInit(): void {
    sessionStorage.setItem('Authorization','false');
    this.formValue= this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }
  ValidateUser()
  {
    let userData = new UserData();
    userData.email = this.formValue.value.email;
    userData.password = this.formValue.value.password;
    this.api.validateUser(userData).subscribe(response=>{
      if(response === true)
      {
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem('Authorization','true');
      }
      else
      {
        this.isValidUser = false;
        this.errorMessage="Invalid UserName or Password";
      }
    })
  }
}
