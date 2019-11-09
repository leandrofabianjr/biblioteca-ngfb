import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {IBaseDTO, BaseDTOService} from './base-dto.service';

export interface IAuthorDTO extends IBaseDTO {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseDTOService<IAuthorDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'authors');
  }

  load(limit: number = 10, orderBy: string = 'name') {
    super.load(limit, orderBy);
  }
}
