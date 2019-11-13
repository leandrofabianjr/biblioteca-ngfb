import { Injectable } from '@angular/core';
import {IDto, BaseDtoService} from './base-dto.service';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Item} from '../models/item';
import {IPublisherDTO, PublishersService} from './publishers.service';
import {Publisher} from '../models/publisher';
import {AuthorsService, IAuthorDTO} from './authors.service';
import {GenresService, IGenreDTO} from './genres.service';
import {Genre} from '../models/genre';
import {Author} from '../models/author';
import {ILocationDTO, LocationsService} from './locations.service';
import {Location} from '../models/location';

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
  static COLLECTION_PATH = 'items';
  constructor(afs: AngularFirestore, auth: AuthService) {
    super(afs, auth, ItemsService.COLLECTION_PATH);
  }

  load(limit: number = 10, orderBy: string = 'description') {
    super.load(limit, orderBy);
  }

  protected toDto(obj: Item): IItemDTO {
    return {
      id: obj.id,
      uid: obj.uid,
      description: obj.description,
      publishers: obj.publishers.map(o => this.afs.doc(`${PublishersService.COLLECTION_PATH}/${o.id}`).ref),
      year: obj.year,
      location: this.afs.doc(`${LocationsService.COLLECTION_PATH}/${obj.location.id}`).ref,
      authors: obj.authors.map(o => this.afs.doc(`${AuthorsService.COLLECTION_PATH}/${o.id}`).ref),
      genres: obj.genres.map(o => this.afs.doc(`${GenresService.COLLECTION_PATH}/${o.id}`).ref)
    };
  }

  protected toModel(dto: IItemDTO): Promise<Item> {
    return Promise.all([
      dto.location.get()
        .then(ss => ({ id: ss.id, ...ss.data() } as ILocationDTO))
        .then(l => {
          const loc = new Location();
          loc.id = l.id;
          loc.uid = l.uid;
          loc.description = l.description;
          return loc;
        }),
      Promise.all(dto.publishers.map(ref => ref.get()))
        .then((SSs) => SSs.map(ss => ({ id: ss.id, ...ss.data()} as IPublisherDTO)))
        .then(pubs => pubs.map(p => {
          const pub = new Publisher();
          pub.id = p.id;
          pub.uid = p.uid;
          pub.name = p.name;
          return pub;
        })),
      Promise.all(dto.authors.map(ref => ref.get()))
        .then((SSs) => SSs.map(ss => ({ id: ss.id, ...ss.data()} as IAuthorDTO)))
        .then(auts => auts.map(a => {
          const aut = new Author();
          aut.id = a.id;
          aut.uid = a.uid;
          aut.name = a.name;
          return aut;
        })),
      Promise.all(dto.genres.map(ref => ref.get()))
        .then((SSs) => SSs.map(ss => ({ id: ss.id, ...ss.data()} as IGenreDTO)))
        .then(gnrs => gnrs.map(g => {
          const gnr = new Genre();
          gnr.id = g.id;
          gnr.uid = g.uid;
          gnr.description = g.description;
          return gnr;
        }))
    ]).then(([loc, pubs, auts, gnrs]) => {
        const obj = new Item();
        obj.id = dto.id;
        obj.uid = dto.uid;
        obj.year = dto.year;
        obj.description = dto.description;
        obj.location = loc;
        obj.publishers = pubs;
        obj.authors = auts;
        obj.genres = gnrs;
        return obj;
      });
  }
}
