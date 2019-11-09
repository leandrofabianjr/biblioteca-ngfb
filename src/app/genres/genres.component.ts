import { Component, OnInit } from '@angular/core';
import {IGenreDTO, GenresService} from '../services/genres.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass']
})
export class GenresComponent implements OnInit {
  genres: Observable<IGenreDTO[]>;

  constructor(private gnrSrv: GenresService) {
    this.genres = gnrSrv.data;
  }

  ngOnInit() {
    this.gnrSrv.load();
  }

}
