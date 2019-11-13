import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {IDto, BaseDtoService} from './base-dto.service';
import {Publisher} from '../models/publisher';

export interface IPublisherDTO extends IDto {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublishersService extends BaseDtoService<Publisher, IPublisherDTO> {
  static COLLECTION_PATH = 'publishers';
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, PublishersService.COLLECTION_PATH);
  }

  load(limit: number = 10, orderBy: string = 'name') {
    super.load(limit, orderBy);
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
