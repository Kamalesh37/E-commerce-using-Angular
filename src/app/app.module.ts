import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';
import { SignComponent } from './sign/sign.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { ServiceComponent } from './service/service.component';
import { BranchComponent } from './branch/branch.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TelevisionComponent } from './television/television.component';
import { Router, RouterModule, ROUTES } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AboutComponent,
    CourseComponent,
    LoginComponent,
    SidebarComponent,
    ContactComponent,
    SignComponent,
    Child1Component,
    Child2Component,
    ServiceComponent,
    BranchComponent,
    ContactusComponent,
    TelevisionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
