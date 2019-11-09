import { Injectable } from '@angular/core';
import {BaseModel, BaseModelService} from './base-model.service';
import {AngularFirestore, DocumentReference, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

export interface Item extends BaseModel {
  description: string;
  publishers: [];
  year: number;
  location: DocumentReference;
  authors: [];
  genres: [];
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends BaseModelService<Item> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'items');
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }

  protected buildModel(d: QueryDocumentSnapshot<Item>): Item {
    return super.buildModel(d);
  }
}
