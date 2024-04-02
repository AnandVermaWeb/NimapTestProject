import { Component, OnInit } from '@angular/core';
import { UsersService } from '../registration/Services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-profile',
  templateUrl: './all-profile.component.html',
  styleUrls: ['./all-profile.component.css']
})
export class AllProfileComponent{
  UsersDetail:any

    constructor( private getuser:UsersService, private route:Router ){}
  
  ngOnInit(): void {
    this.retriveUser();
  }
  retriveUser(){
    this.getuser.getUser().subscribe(data=>{
      this.UsersDetail=data;
      console.log(data)
    },(err)=>{
      console.log("data cant retrieve",err)
    })
  }
  updateUser(id:any){
    this.route.navigateByUrl("/update/"+id)
  }
  updatePic(id:any){
    this.route.navigateByUrl("/updatePic/"+id);
  }
  }
  

