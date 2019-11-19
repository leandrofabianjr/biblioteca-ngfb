import {NgModule} from '@angular/core';
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

  { path: 'u', component: LoggedComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])), children: [
    { path: 'logout', component: LogoutComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    { path: 'me', component: UserComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},

    { path: 'authors', component: AuthorsComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    { path: 'genres', component: GenresComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    { path: 'locations', component: LocationsComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    { path: 'publishers', component: PublishersComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    { path: 'items', ...canActivate(() => redirectUnauthorizedTo(['/login'])), children: [
      { path: '', component: ItemsComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
      { path: 'new', component: ItemsNewComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
      { path: ':id', component: ItemsNewComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))},
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
