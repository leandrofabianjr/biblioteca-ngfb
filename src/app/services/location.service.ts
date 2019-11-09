import { Injectable } from '@angular/core';
import {IBaseDTO, BaseDTOService} from './base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

export interface ILocationDTO extends IBaseDTO {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseDTOService<ILocationDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'locations');
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }
}
