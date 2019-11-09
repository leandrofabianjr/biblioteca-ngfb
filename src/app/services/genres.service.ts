import { Injectable } from '@angular/core';
import {IBaseDTO, BaseDTOService} from './base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

export interface IGenreDTO extends IBaseDTO {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseDTOService<IGenreDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'genres');
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }
}
