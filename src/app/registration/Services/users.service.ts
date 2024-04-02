import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private Userhttp:HttpClient) { }
  createUser(body:any){
    return this.Userhttp.post('http://localhost:3000/RegisteredUser',body);
  }
getUser(){
  return this.Userhttp.get('http://localhost:3000/RegisteredUser')
}

getUserById(id:any):Observable<any>{
  return this.Userhttp.get('http://localhost:3000/RegisteredUser/'+id)
}

updateUser(id:number,body:any):Observable<any>{
  return this.Userhttp.put('http://localhost:3000/RegisteredUser/'+id,body);
}
}
