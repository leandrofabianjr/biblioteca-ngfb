import {Injectable} from '@angular/core';
import {BaseDtoService, CollectionType, IDto} from './base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Genre} from '../models/genre';

export interface IGenreDTO extends IDto {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class GenresService extends BaseDtoService<Genre, IGenreDTO> {
  constructor(afs: AngularFirestore) {
    super(afs, CollectionType.Genres);
  }

  protected toDto(obj: Genre): IGenreDTO {
    return {
      id: obj.id,
      uid: obj.uid,
      description: obj.description
    };
  }

  protected toModel(dto: IGenreDTO): Genre {
    const obj = new Genre();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.description = dto.description;
    return obj;
  }
}
