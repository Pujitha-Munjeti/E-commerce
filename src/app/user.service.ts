import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  //user registration
  createUser(userObj:any):Observable<any>{
    return this.hc.post("/user/registration",userObj)
  }

  loginUser(userCredObj:any):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }

  createProduct(product:any):Observable<any>{
    return this.hc.post("/admin/addproduct",product);
  }

  getProducts():Observable<any>{
    return this.hc.get("/admin/allproducts");
  }

  editProduct(obj):Observable<any>{
    return this.hc.post("/admin/editproduct",obj)
  }

  deleteProduct(obj):Observable<any>{
    console.log("the obj in US is ",obj)
    return this.hc.post("/admin/delete",obj);
  }
}
