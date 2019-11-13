import { Injectable } from '@angular/core';
import {IDto, BaseDtoService} from './base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Genre} from '../models/genre';

export interface IGenreDTO extends IDto {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseDtoService<Genre, IGenreDTO> {
  static COLLECTION_PATH = 'genres';
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, GenresService.COLLECTION_PATH);
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
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
