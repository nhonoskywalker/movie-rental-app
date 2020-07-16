import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { MoviesAddComponent } from './movies-add/movies-add.component';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { MoviesRentComponent } from './movies-rent/movies-rent.component';
import { StoreComponent } from './store/store.component';
import { CustomerMoviesComponent } from './customer-movies/customer-movies.component';
import { AuthGuard } from 'src/_shared/auth/auth.guard';
import { Roles } from 'src/_shared/constants/roles.constants';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { AdminModule} from 'src/app/dashboard-admin/admin.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin', component: DashboardAdminComponent,
    loadChildren: 'src/app/dashboard-admin/admin.module#AdminModule'
    // children: [
    //   { path: 'registration/:role', component: RegistrationComponent },
    //   { path: 'users/view', component: UsersViewComponent },
    //   { path: 'movies/add', component: MoviesAddComponent },
    //   { path: 'movies/view', component: MoviesViewComponent },
    // ]
    ,
    canActivate: [AuthGuard], data: { roles: [Roles[0]] }
  },
  {
    path: 'store', component: StoreComponent,
    children: [
      { path: 'movies', component: MoviesRentComponent },
      { path: 'mymovies', component: CustomerMoviesComponent },
    ], canActivate: [AuthGuard], data: { roles: [Roles[1]] }
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration/:role', component: RegistrationComponent },
  { path: 'noaccess', component: UnauthorizedPageComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
