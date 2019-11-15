import {Injectable} from '@angular/core';
import {AngularFirestore, FieldPath} from '@angular/fire/firestore';
import {BaseDtoService, CollectionType, IDto} from './base-dto.service';
import {Publisher} from '../models/publisher';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

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

  load(limit: number = 5, orderBy: string = 'name', orderDirection: 'asc' | 'desc' = 'asc',
       where: [(string | FieldPath), WhereFilterOp, any] = null) {
    super.load(limit, orderBy, orderDirection, where);
  }

  protected toDto(obj: Publisher): IPublisherDTO {
    return {
      id: obj.id,
      uid: obj.uid,
      name: obj.name
    };
  }

  protected toModel(dto: IPublisherDTO): Promise<Publisher> {
    const obj = new Publisher();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.name = dto.name;
    return new Promise<Publisher>(res => res(obj));
  }
}
