import { Injectable } from '@angular/core';
import {BaseModel, BaseModelService} from './base-model.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

export interface Location extends BaseModel {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseModelService<Location> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'locations');
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }
}
