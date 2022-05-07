import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  // Now here I will define the POST,GET,PUT,DELETE
  postRestaurant(data:any)
  {
    return this._http.post("http://localhost:3000/RestaurantData",data).pipe(map((res:any)=>{
      return res;
    }))
  }
  //Get RestaurantData
  getRestaurent()
  {
    return this._http.get<any>("http://localhost:3000/RestaurantData").pipe(map((res:any)=>{
    return res;
    }))
  }
  //Update Data 
  updateRestaurent(data:any,id:number)
  {
    return this._http.put<any>("http://localhost:3000/RestaurantData/"+id,data).pipe(map((res:any)=>{
    return res;
    }))
  }
  //Delete Data
  deleteRestaurent(id:number)
  {
    return this._http.delete<any>("http://localhost:3000/RestaurantData/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
