import { Component, OnInit } from '@angular/core';
import {GenresService} from '../services/genres.service';
import {Observable} from 'rxjs';
import {Genre} from '../models/genre';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass']
})
export class GenresComponent implements OnInit {
  genres: Observable<Genre[]>;

  constructor(private gnrSrv: GenresService) {
    this.genres = gnrSrv.data;
  }

  ngOnInit() {
    this.gnrSrv.load();
  }

}
