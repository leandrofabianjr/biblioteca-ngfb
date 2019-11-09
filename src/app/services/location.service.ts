import { Injectable } from '@angular/core';
import {IDto, BaseDtoService} from './base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Location} from '../models/location';

export interface ILocationDTO extends IDto {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseDtoService<Location, ILocationDTO> {
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, 'locations');
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }

  protected toDto(obj: Location): ILocationDTO {
     return {
      id: obj.id,
      uid: obj.uid,
      description: obj.description
    };
  }

  protected toModel(dto: ILocationDTO): Promise<Location> {
    const obj = new Location();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.description = dto.description;
    return new Promise<Location>(res => res(obj));
  }
}
