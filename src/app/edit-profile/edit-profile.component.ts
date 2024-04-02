import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,Validators,FormControl } from '@angular/forms';
import { UsersService } from '../registration/Services/users.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent  implements OnInit{
 
  Image = '/assets/Images/back.jpeg';
  url = '/assets/Images/users.webp';
  id:any;
  userData: any;
  isFormChanged =false;
  states: string[] = [];
  countries = [
    { name: 'India', states: ['Gujarat', 'Rajasthan', 'Maharashtra', 'Delhi', 'Tamil Nadu'] },
    { name: 'USA', states: ['California', 'Texas', 'New York', 'Colorado', 'Indiana'] },
    { name: 'UK', states: ['England', 'Scotland', 'Wales', 'Northem Ireland'] },
    { name: 'AUSTRALIA', states: ['Hokkaido', 'Chibe', 'Fukui', 'Gunma'] },
    { name: 'JAPAN', states: ['Victoria', 'Queensland', 'Tasmania', 'South Wales', 'Western Australia', 'South Australia'] }
  ];
  
  profileForm = new FormGroup({
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

constructor(private route:ActivatedRoute, private UpdateSer:UsersService,private router:Router){}
 ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get("id");
  this.userData=this.UpdateSer.getUserById(this.id).subscribe(
    (data: any) => {
      this.userData = data;
      this.profileForm.patchValue(this.userData);
      console.log(this.userData);
      this.url = this.userData.userimage;
      this.onCountryChange()
      this.profileForm.get('state')?.setValue(this.userData.state)
     

    },
    error => {
      console.error('Error fetching user details:', error);
      // Handle error
 });
  // Subscribe to form value changes
}
onFormChange(){
  this.isFormChanged =true;
};

onCountryChange(): void {
  const selectedCountry = this.profileForm.get('country')?.value;
  const country = this.countries.find(c => c.name === selectedCountry);
  if (country) {
    this.states = country.states;
    this.profileForm.patchValue({ state: '' }); // Reset selected state
  }
}
onSelectFile(e: any) {
  if (e.target.files) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (event: any) => {
      this.url = event.target.result;
      this.profileForm.patchValue({ userimage: event.target.result });
    }
  }
}
onSubmit(): void {
  if(this.profileForm.valid){
  {
    const updatedData =  {
      id: this.profileForm.value.id,
      userimage: this.url,
      firstname: this.profileForm.value.firstname,
      lastname: this.profileForm.value.lastname,
      email: this.profileForm.value.email,
      contacts: this.profileForm.value.contacts,
      age: this.profileForm.value.age,
      tags: this.profileForm.value.tags,
      state: this.profileForm.value.state,
      country: this.profileForm.value.country,
};
this.UpdateSer.updateUser(this.id, updatedData).subscribe((data) => {
  console.log(data);
  alert('Record updated successfully');
  this.router.navigate(['/allprofile']);
}, (err) => {
  console.log("Error updating data", err);
});
  }
}
}
}
