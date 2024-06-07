import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BranchComponent } from './branch/branch.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { ContactComponent } from './contact/contact.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CourseComponent } from './course/course.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { SignComponent } from './sign/sign.component';
import { TelevisionComponent } from './television/television.component';
const routes: Routes = [
  {path: "Home", component:HomeComponent},
  {path:"About",component:AboutComponent},
  {path:"Careers",component:CourseComponent},
  {path:"Product",component:ContactComponent},
  {path:"Product",component:ContactComponent},
  {path:"child2",component:Child1Component},
  {path:"rog",component:SignComponent},
  {path:"child1",component:Child2Component},
  {path:"service",component:ServiceComponent},
  {path:"branch",component:BranchComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"Tele",component:TelevisionComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
