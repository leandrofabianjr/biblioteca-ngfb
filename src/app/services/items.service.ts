import { Injectable } from '@angular/core';
import {IBaseDTO, BaseDTOService} from './base-dto.service';
import {AngularFirestore, DocumentReference, QueryDocumentSnapshot} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

export interface IItemDTO extends IBaseDTO {
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
export class ItemsService extends BaseDTOService<IItemDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'items');
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }

  protected buildModel(d: QueryDocumentSnapshot<IItemDTO>): IItemDTO {
    return super.buildModel(d);
  }
}
