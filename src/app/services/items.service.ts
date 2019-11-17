import {Injectable} from '@angular/core';
import {BaseDtoService, CollectionType, IDto} from './base-dto.service';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Item} from '../models/item';
import {PublishersService} from './publishers.service';
import {AuthorsService} from './authors.service';
import {GenresService} from './genres.service';
import {LocationsService} from './locations.service';

export interface IItemDTO extends IDto {
  description: string;
  publishers: DocumentReference[];
  year: number;
  location: DocumentReference;
  authors: DocumentReference[];
  genres: DocumentReference[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService extends BaseDtoService<Item, IItemDTO> {
  constructor(
    afs: AngularFirestore,
    private autSrv: AuthorsService,
    private gnrSrv: GenresService,
    private pubSrv: PublishersService,
    private locSrv: LocationsService
  ) {
    super(afs, CollectionType.Items);
  }

  protected toDto(obj: Item): IItemDTO {
    return {
      id: obj.id,
      uid: obj.uid,
      description: obj.description,
      publishers: obj.publishers.map(o => this.afs.doc(`${CollectionType.Publishers}/${o.id}`).ref),
      year: obj.year,
      location: this.afs.doc(`${CollectionType.Locations}/${obj.location.id}`).ref,
      authors: obj.authors.map(o => this.afs.doc(`${CollectionType.Authors}/${o.id}`).ref),
      genres: obj.genres.map(o => this.afs.doc(`${CollectionType.Genres}/${o.id}`).ref)
    };
  }

  protected toModel(dto: IItemDTO): Item {
    const obj = new Item();
    obj.id = dto.id;
    obj.uid = dto.uid;
    obj.year = dto.year;
    obj.description = dto.description;
    obj.location = this.locSrv.get(dto.location.id);
    obj.publishers = dto.publishers.map(ref => this.pubSrv.get(ref.id));
    obj.authors = dto.authors.map(ref => this.autSrv.get(ref.id));
    obj.genres = dto.genres.map(ref => this.gnrSrv.get(ref.id));
    return obj;
  }
}
