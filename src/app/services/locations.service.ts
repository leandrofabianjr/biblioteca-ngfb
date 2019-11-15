import {Injectable} from '@angular/core';
import {BaseDtoService, CollectionType, IDto} from './base-dto.service';
import {AngularFirestore, FieldPath} from '@angular/fire/firestore';
import {Location} from '../models/location';
import WhereFilterOp = firebase.firestore.WhereFilterOp;

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

  load(limit: number = 5, orderBy: string = 'description', orderDirection: 'asc' | 'desc' = 'asc',
       where: [(string | FieldPath), WhereFilterOp, any] = null) {
    super.load(limit, orderBy, orderDirection, where);
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
