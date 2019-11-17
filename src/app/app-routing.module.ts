import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {LogoutComponent} from './logout/logout.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {AuthorsComponent} from './authors/authors.component';
import {GenresComponent} from './genres/genres.component';
import {LocationsComponent} from './locations/locations.component';
import {PublishersComponent} from './publishers/publishers.component';
import {ItemsComponent} from './items/items.component';
import {ItemsNewComponent} from './items/items-new/items-new.component';
import {LoggedComponent} from './logged/logged.component';


const routes: Routes = [
  { path: '', redirectTo: 'u/me', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['me'])) },

  { path: 'u', component: LoggedComponent, ...canActivate(() => redirectUnauthorizedTo(['login'])), children: [
    { path: 'logout', component: LogoutComponent },
    { path: 'me', component: UserComponent},

    { path: 'authors', component: AuthorsComponent},
    { path: 'genres', component: GenresComponent},
    { path: 'locations', component: LocationsComponent},
    { path: 'publishers', component: PublishersComponent},
    { path: 'items', children: [
      { path: '', component: ItemsComponent },
      { path: 'new', component: ItemsNewComponent },
      { path: ':id', component: ItemsNewComponent }
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
