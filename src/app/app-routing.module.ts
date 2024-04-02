import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditPictureComponent } from './edit-picture/edit-picture.component';
import { AllProfileComponent } from './all-profile/all-profile.component';
const routes: Routes = [
  
  
  {path:"home",component:HomeComponent},
  {path:"",component:HomeComponent},
  {path:"profile/:id", component:ProfileComponent},
  {path:"update/:id", component:EditProfileComponent},
  {path:"updatePic/:id", component:EditPictureComponent},
  {path:"allprofile",component:AllProfileComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

