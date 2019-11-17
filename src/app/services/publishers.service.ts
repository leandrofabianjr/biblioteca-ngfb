import {Injectable} from '@angular/core';
import {AngularFirestore, FieldPath} from '@angular/fire/firestore';
import {BaseDtoService, CollectionType, IDto} from './base-dto.service';
import {Publisher} from '../models/publisher';

export interface IPublisherDTO extends IDto {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublishersService extends BaseDtoService<Publisher, IPublisherDTO> {
  constructor(afs: AngularFirestore) {
    super(afs, CollectionType.Publishers);
  }

  protected toDto(obj: Publisher): IPublisherDTO {
    return {
      id: obj.id,
      uid: obj.uid,
      name: obj.name
    };
  }

  protected toModel(dto: IPublisherDTO): Publisher {
    const obj = new Publisher();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.name = dto.name;
    return obj;
  }
}
