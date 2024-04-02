import { Component, OnInit } from '@angular/core';
import { UsersService } from '../registration/Services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor( private getuser:UsersService,private route:ActivatedRoute, private router:Router ){}
UsersDetails:any;
user:any


ngOnInit(): void {
  this.route.params.subscribe(params => {
    const userId = params['id']; // Get the user ID from the route parameters
    if (userId) {
      this.getuser.getUserById(userId).subscribe((data: any) => {
        this.user = data; // Set the user details retrieved from the service
      }, (err) => {
        console.log("Data can't retrieve", err);
      });
    }
  });
}
// retriveUser(){
//   this.getuser.getUser().subscribe(data=>{
//     this.UsersDetails=data;
//     console.log(data)
//   },(err)=>{
//     console.log("data cant retrieve",err)
//   })
// }
updateUser(id:any){
  this.router.navigateByUrl("/update/"+id)
}
updatePic(id:any){
  this.router.navigateByUrl("/updatePic/"+id);
}
}
