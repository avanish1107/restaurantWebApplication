import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestrentData } from '../Restaurnet.Model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup
  restanrentModelObject:RestrentData = new RestrentData();
  allRestaurentData:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService,private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('Authorization')!=='true')
    {
      alert("Not Authorized");
      this.router.navigate(['/login']);
    }
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    });
    this.allResto();
  }

  // Click on add Resto
  ClickAddResto()
  {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate=false;
  }
  // Now Subscribe our data is mapped via service
  addResto()
  {
    this.restanrentModelObject.name = this.formValue.value.name;
    this.restanrentModelObject.email = this.formValue.value.email;
    this.restanrentModelObject.address = this.formValue.value.address;
    this.restanrentModelObject.mobile = this.formValue.value.mobile;
    this.restanrentModelObject.service = this.formValue.value.service;
    this.api.postRestaurant(this.restanrentModelObject).subscribe(res =>{
      console.log(res);
      alert("Restaurent Added Successfully ");
      this.formValue.reset();
      this.allResto();
    },
    err=>{
      alert("Something went wrong");
    }
    )
  }
  allResto()
  {
    this.api.getRestaurent().subscribe(res =>{
      this.allRestaurentData = res;
    })
  }

  deleteResto(id:number)
  {
    this.api.deleteRestaurent(id).subscribe(res =>{
      alert("Data Deleted Successfully");
      this.allResto();
    },
    err =>{
      alert("Some Error occured while deleting");
    }
    )
  }
  onEditResto(data:any)
  {
    this.showAdd = false;
    this.showUpdate = true;
    this.restanrentModelObject.id = data.id;
    this.formValue.controls["name"].setValue(data.name);
    this.formValue.controls["email"].setValue(data.email);
    this.formValue.controls["address"].setValue(data.address);
    this.formValue.controls["mobile"].setValue(data.mobile);
    this.formValue.controls["service"].setValue(data.service);
  }
  updateResto()
  {
    this.restanrentModelObject.name = this.formValue.value.name;
    this.restanrentModelObject.email = this.formValue.value.email;
    this.restanrentModelObject.address = this.formValue.value.address;
    this.restanrentModelObject.mobile = this.formValue.value.mobile;
    this.restanrentModelObject.service = this.formValue.value.service;
    this.api.updateRestaurent(this.restanrentModelObject,this.restanrentModelObject.id).subscribe(res=>{
      alert("Data Updated Successfully");
      this.allResto();
    },
    err=>{
      alert("Some error occured while edit");
    }
    )
  }
  Logout()
  {
    this.router.navigate(['/login']);
  }
}
