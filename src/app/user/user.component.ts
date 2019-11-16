import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CollectionStats, StatsService} from '../services/stats.service';
import {CollectionType} from '../services/base-dto.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  stats = {
    items: {} as CollectionStats,
    authors: {} as CollectionStats,
    genres: {} as CollectionStats,
    locations: {} as CollectionStats,
    publishers: {} as CollectionStats,
  };

  constructor(public afs: AngularFirestore, public auth: AuthService) {
    new StatsService(afs, CollectionType.Items).get().subscribe(s => this.stats.items = s);
    new StatsService(afs, CollectionType.Authors).get().subscribe(s => this.stats.authors = s);
    new StatsService(afs, CollectionType.Genres).get().subscribe(s => this.stats.genres = s);
    new StatsService(afs, CollectionType.Locations).get().subscribe(s => this.stats.locations = s);
    new StatsService(afs, CollectionType.Publishers).get().subscribe(s => this.stats.publishers = s);
  }

  ngOnInit() { }
}
