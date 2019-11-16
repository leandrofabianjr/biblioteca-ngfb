import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';
import { LocationsComponent } from './locations/locations.component';
import { PublishersComponent } from './publishers/publishers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsComponent } from './items/items.component';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule, MatPaginatorIntl, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {MatPaginatorIntlPtbr} from './mat-paginator-intl-ptbr';
import { ItemsNewComponent } from './items/items-new/items-new.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InfoErroCampoComponent } from './info-erro-campo/info-erro-campo.component';
import {NgSelectModule} from '@ng-select/ng-select';
import { RealTimeSearchDirective } from './directives/real-time-search.directive';
import { AuthorsNewComponent } from './authors/authors-new/authors-new.component';
import { GenresNewComponent } from './genres/genres-new/genres-new.component';
import { LocationsNewComponent } from './locations/locations-new/locations-new.component';
import { PublishersNewComponent } from './publishers/publishers-new/publishers-new.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { TabColumnSearchComponent } from './tab-column-search/tab-column-search.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    LogoutComponent,
    AuthorsComponent,
    GenresComponent,
    LocationsComponent,
    PublishersComponent,
    ItemsComponent,
    ItemsNewComponent,
    InfoErroCampoComponent,
    RealTimeSearchDirective,
    AuthorsNewComponent,
    GenresNewComponent,
    LocationsNewComponent,
    PublishersNewComponent,
    DialogConfirmationComponent,
    TabColumnSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtbr}],
  bootstrap: [AppComponent],
  entryComponents: [
    AuthorsNewComponent,
    GenresNewComponent,
    PublishersNewComponent,
    LocationsNewComponent,
    DialogConfirmationComponent
  ]
})
export class AppModule { }
