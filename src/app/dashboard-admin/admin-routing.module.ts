import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { UsersViewComponent } from '../users-view/users-view.component';
import { MoviesAddComponent } from '../movies-add/movies-add.component';
import { MoviesViewComponent } from '../movies-view/movies-view.component';

const routes: Routes = [
  { path: 'registration/:role', component: RegistrationComponent },
  { path: 'users/view', component: UsersViewComponent },
  { path: 'movies/add', component: MoviesAddComponent },
  { path: 'movies/view', component: MoviesViewComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [
  ]
})
export class AdminRoutingModule { }
