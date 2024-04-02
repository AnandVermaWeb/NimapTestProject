import { Component } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../registration/Services/users.service';
@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.css']
})
export class EditPictureComponent {
  Image = '/assets/Images/back.jpeg';
  url = '/assets/Images/1.png';
  id: any;
  userData: any;
  isFormChanged =false;
 
  updatePicture = new FormGroup({
    id: new FormControl(''),
    userimage: new FormControl(null),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contacts: new FormControl('',[(Validators.required)]) ,
    age: new FormControl('' ,Validators.required),
    tags: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
   
  });

  constructor(private route:ActivatedRoute, private updPictureSer:UsersService,private router:Router){}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userData=this.updPictureSer.getUserById(this.id).subscribe(
      (data: any) => {
        this.userData = data;
        this.updatePicture.patchValue(this.userData);
        console.log(this.userData);
        this.url = this.userData.userimage;
        
      },
      error => {
        console.error('Error fetching user details:', error);
        // Handle error
   });
  }
  onFormChange(){
    this.isFormChanged =true;
  };
  onUpdatePic() {
    if (this.updatePicture.valid) {
      const updatePic = {
        id: this.updatePicture.value.id,
        userimage: this.url,
        firstname: this.updatePicture.value.firstname,
        lastname: this.updatePicture.value.lastname,
        email: this.updatePicture.value.email,
        contacts: this.updatePicture.value.contacts,
        age: this.updatePicture.value.age,
        tags: this.updatePicture.value.tags,
        state: this.updatePicture.value.state,
        country: this.updatePicture.value.country,
       
      };
      this.updPictureSer.updateUser(this.id, updatePic).subscribe((data) => {
        console.log(data);
        alert('Record updated successfully');
        this.router.navigate(['/allprofile']);
      }, (err) => {
        console.log("Error updating data", err);
      });
    }
    }

    onSelectFile(e: any) {
      if (e.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.updatePicture.patchValue({ userimage: event.target.result });
        }
      }
    }
  }

