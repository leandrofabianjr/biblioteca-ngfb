import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {IBaseDTO, BaseDTOService} from './base-dto.service';

export interface IPublisherDTO extends IBaseDTO{
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublishersService extends BaseDTOService<IPublisherDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'publishers');
  }

  load(limit: number = 10, orderBy: string = 'name') {
    super.load(limit, orderBy);
  }
}
