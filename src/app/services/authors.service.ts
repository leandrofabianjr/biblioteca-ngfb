import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {IDto, BaseDtoService} from './base-dto.service';
import {Author} from '../models/author';

export interface IAuthorDTO extends IDto {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseDtoService<Author, IAuthorDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'authors');
  }

  load(limit: number = 10, orderBy: string = 'name') {
    super.load(limit, orderBy);
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

