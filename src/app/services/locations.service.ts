import {Injectable} from '@angular/core';
import {BaseDtoService, CollectionType, IDto} from './base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Location} from '../models/location';

export interface ILocationDTO extends IDto {
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService extends BaseDtoService<Location, ILocationDTO> {
  constructor(afs: AngularFirestore) {
    super(afs, CollectionType.Locations);
  }

  protected toDto(obj: Location): ILocationDTO {
     return {
      id: obj.id,
      uid: obj.uid,
      description: obj.description
    };
  }

  protected toModel(dto: ILocationDTO): Location {
    const obj = new Location();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.description = dto.description;
    return obj;
  }
}
