import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '../shared/UserApi.service';
import { UserData } from '../SignUp.Model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private api:UserApiService) { }
  formValue!: FormGroup;
  UserDataObj:UserData = new UserData();
  ErrorMessage:string ='';
  IsValidModel:boolean = false;
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      mobile: ['',Validators.required],
      password: ['',Validators.required]
    });
  }
  SignUp()
  {
    if(this.formValue.value.name==="")
    {
      this.ErrorMessage="Kindly Enter Name";
      this.IsValidModel=true;
      return;
    }
    if(this.formValue.value.mobile==="")
    {
      this.ErrorMessage="Kindly Enter Mobile";
      this.IsValidModel=true;
      return;
    }
    if(this.formValue.value.email==="")
    {
      this.ErrorMessage="Kindly Enter Email";
      this.IsValidModel=true;
      return;
    }
    if(this.formValue.value.password==="")
    {
      this.ErrorMessage="Kindly Enter Password";
      this.IsValidModel=true;
      return;
    }
    this.UserDataObj.name = this.formValue.value.name;
    this.UserDataObj.email = this.formValue.value.email;
    this.UserDataObj.password = this.formValue.value.password;
    this.UserDataObj.mobile = this.formValue.value.mobile;
    this.api.createUser(this.UserDataObj).subscribe(response =>{
      if(response ===true)
      {
        console.log("User Created Successfully");
        this.formValue.value.name='';
        this.formValue.value.email='';
        this.formValue.value.mobile='';
        this.formValue.value.password='';
        this.IsValidModel=false; 
        this.ErrorMessage='';
      }
      else
      {
        console.log("Error Occured");
      }
    },
    error=>{
      alert("Unable to create User");
    }
    );
  }
}
