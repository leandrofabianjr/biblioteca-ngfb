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


const routes: Routes = [
  { path: '', redirectTo: 'me', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo(['me'])) },
  { path: 'logout', component: LogoutComponent },
  { path: 'me', component: UserComponent, ...canActivate(() => redirectUnauthorizedTo(['login']))},

  { path: 'authors', component: AuthorsComponent, ...canActivate(() => redirectUnauthorizedTo(['login']))},
  { path: 'genres', component: GenresComponent, ...canActivate(() => redirectUnauthorizedTo(['login']))},
  { path: 'locations', component: LocationsComponent, ...canActivate(() => redirectUnauthorizedTo(['login']))},
  { path: 'publishers', component: PublishersComponent, ...canActivate(() => redirectUnauthorizedTo(['login']))},
  { path: 'items', component: ItemsComponent, ...canActivate(() => redirectUnauthorizedTo(['login']))},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
