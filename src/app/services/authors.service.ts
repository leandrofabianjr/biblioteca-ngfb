import { Injectable } from '@angular/core';
import {AngularFirestore, FieldPath} from '@angular/fire/firestore';
import {IDto, BaseDtoService} from './base-dto.service';
import {Author} from '../models/author';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface IAuthorDTO extends IDto {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseDtoService<Author, IAuthorDTO> {
  static COLLECTION_PATH = 'authors';
  constructor(afs: AngularFirestore) {
    super(afs, AuthorsService.COLLECTION_PATH);
  }

  load(limit: number = 10, orderBy: string = 'name', orderDirection: 'desc' | 'asc' = 'asc',
       where: [(string | FieldPath), WhereFilterOp, any] = null) {
    super.load(limit, orderBy, orderDirection, where);
  }

  protected toDto(dto: Author): IAuthorDTO {
    return {
      id: dto.id,
      uid: dto.uid,
      name: dto.name
    };
  }

  protected toModel(dto: IAuthorDTO): Promise<Author> {
    const obj = new Author();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.name = dto.name;
    return new Promise<Author>(res => res(obj));
  }
}

