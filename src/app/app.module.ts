import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { StoreComponent } from './store/store.component';
import { AngularMaterialModule } from './angular-material.module';
import { UsersViewComponent } from './users-view/users-view.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { MoviesAddComponent } from './movies-add/movies-add.component';
import { MoviesRentComponent } from './movies-rent/movies-rent.component';
import { CustomerMoviesComponent } from './customer-movies/customer-movies.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardAdminComponent,
    StoreComponent,
    // UsersViewComponent,
    // MoviesViewComponent,
    // MoviesAddComponent,
    MoviesRentComponent,
    CustomerMoviesComponent,
    UnauthorizedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
