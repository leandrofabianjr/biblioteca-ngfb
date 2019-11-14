import { Injectable } from '@angular/core';
import {IDto, BaseDtoService} from './base-dto.service';
import {AngularFirestore, FieldPath} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Genre} from '../models/genre';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface IGenreDTO extends IDto {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseDtoService<Genre, IGenreDTO> {
  static COLLECTION_PATH = 'genres';
  constructor(afs: AngularFirestore) {
    super(afs, GenresService.COLLECTION_PATH);
  }

  load(limit: number = 5, orderBy: string = 'description', orderDirection: 'asc' | 'desc' = 'asc',
       where: [(string | FieldPath), WhereFilterOp, any] = null) {
    super.load(limit, orderBy, orderDirection, where);
  }

  protected toDto(obj: Genre): IGenreDTO {
    return {
      id: obj.id,
      uid: obj.uid,
      description: obj.description
    };
  }

  protected toModel(dto: IGenreDTO): Promise<Genre> {
    const obj = new Genre();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.description = dto.description;
    return new Promise<Genre>(res => res(obj));
  }
}
