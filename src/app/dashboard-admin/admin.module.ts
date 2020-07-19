import { NgModule } from "@angular/core";
import { DashboardAdminComponent } from './dashboard-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RegistrationComponent } from './../registration/registration.component';
import { MoviesAddComponent } from '../movies-add/movies-add.component';
import { MoviesViewComponent } from './../movies-view/movies-view.component';
import { UsersViewComponent } from '../users-view/users-view.component';
import { AngularMaterialModule } from '../angular-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule(
  {
    imports: [
      AdminRoutingModule,
      AngularMaterialModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule,
      CommonModule,
    ],
    declarations: [
      // DashboardAdminComponent,
      // RegistrationComponent,
      UsersViewComponent,
      MoviesViewComponent,
      MoviesAddComponent,
    ],
    exports: []
  })
export class AdminModule { }
