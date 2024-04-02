import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../registration/Services/users.service';
import { Router } from '@angular/router';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';

import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Hobby {
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  RegistrationForm: FormGroup = new FormGroup({});
  Image = '/assets/Images/back.jpg';
  url = '/assets/Images/users.webp';

  countries = [
    { name: 'India', states: ['Gujarat', 'Rajasthan', 'Maharashtra', 'Delhi', 'Tamil Nadu'] },
    { name: 'USA', states: ['California', 'Texas', 'New York', 'Colorado', 'Indiana'] },
    { name: 'UK', states: ['England', 'Scotland', 'Wales', 'Northem Ireland'] },
    { name: 'AUSTRALIA', states: ['Hokkaido', 'Chibe', 'Fukui', 'Gunma'] },
    { name: 'JAPAN', states: ['Victoria', 'Queensland', 'Tasmania', 'South Wales', 'Western Australia', 'South Australia'] }
  ];
  states: string[] = [];
  constructor(private user: UsersService, private router: Router) { }
  ngOnInit(): void {
    this.RegistrationForm = new FormGroup({
      userimage: new FormControl(null, [Validators.required]),
      firstname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*'),Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      contacts: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      age: new FormControl('', [Validators.required,Validators.min(20)]),
      tags: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      addressType: new FormControl(' '),
      homeAddress1: new FormControl('' ),
      homeAddress2: new FormControl(''),
      companyAddress1: new FormControl(''),
      companyAddress2: new FormControl(''),
      country:new  FormControl('', [Validators.required]),
      state:new  FormControl('', [Validators.required]),
    });
  }
  
  get isHomeSelected():boolean {
    return this.RegistrationForm.get('addressType')?.value === 'home';
  }

  get isCompanySelected():boolean {
    return this.RegistrationForm.get('addressType')?.value === 'company';
  }
  onCountryChange(): void {
    const selectedCountry = this.RegistrationForm.get('country')?.value;

    const country = this.countries.find(c => c.name === selectedCountry);
    if (country) {
      this.states = country.states;
      this.RegistrationForm.patchValue({ state: '' }); // Reset selected state
    }
  }

  onSelectFile(e:any){
    if(e.target.files){
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(event:any)=>{
    this.url=event.target.result;
    } 
  }  
  }
  Register() {
    const hobbyNames = this.hobbies.map(hobby => hobby.name).join(','); // Join hobby names with comma
    const postbody = {
      userimage: this.url,
      firstname: this.RegistrationForm.value.firstname,
      lastname: this.RegistrationForm.value.lastname,
      email: this.RegistrationForm.value.email,
      contacts: this.RegistrationForm.value.contacts,
      age: this.RegistrationForm.value.age,
      tags: hobbyNames,
      country: this.RegistrationForm.value.country,
      state: this.RegistrationForm.value.state,
    };
   
    this.user.createUser(postbody).subscribe(
      (userData: any) => {
        console.log(userData);
        alert('Registration Successful');
        const userId = userData.id;
        if (this.RegistrationForm.value) {
          this.router.navigate(['/profile', userId]);
        }
      
    
      },
      (err) => {
        console.log('Error', err);
      }
    );

   
  }

  navigateToProfile() {
     this.router.navigateByUrl('/profile');
  }



  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hobbies: Hobby[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our hobbhy
    if (value) {
      this.hobbies.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(hobby: Hobby): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);

      this.announcer.announce(`Removed ${hobby}`);
    }
  }

  edit(hobby: Hobby, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(hobby);
      return;
    }

    // Edit existing fruit
    const index = this.hobbies.indexOf(hobby);
    if (index >= 0) {
      this.hobbies[index].name = value;
    }
  }
}
