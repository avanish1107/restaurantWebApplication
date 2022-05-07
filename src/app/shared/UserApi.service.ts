import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { UserData } from "../SignUp.Model";

@Injectable({
    providedIn: 'root'
  })
  export class UserApiService {
    constructor(private _http:HttpClient) { }
    createUser(data:UserData)
    {
      return this._http.post("http://127.0.0.1:5000/api/CreateUser",data).pipe(map((response:any)=>{
        if(response["CreateStatus"]==="Successful")
        {
          return true;
        }
        else
        {
          return false;
        }
      }));
    }
    validateUser(data:UserData)
    {
      return this._http.get("http://localhost:3000/UserData").pipe(map((response:any)=>{
        let validation = false;
        response.forEach(function(arrayitems:any) {
          if((arrayitems.email === data.email) && (arrayitems.password === data.password) )
          {
            validation  =true;
          }
        });
        return validation;
      }));
    }
  }  