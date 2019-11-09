import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {BaseModel, BaseModelService} from './base-model.service';

export interface Author extends BaseModel {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseModelService<Author> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'authors');
  }

  load(limit: number = 10, orderBy: string = 'name') {
    super.load(limit, orderBy);
  }
}
