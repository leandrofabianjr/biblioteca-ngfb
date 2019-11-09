import { Component, OnInit } from '@angular/core';
import {IAuthorDTO, AuthorsService} from '../services/authors.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {
  authors: Observable<IAuthorDTO[]>;

  constructor(private autSrv: AuthorsService) {
    this.authors = autSrv.data;
  }

  ngOnInit() {
    this.autSrv.load();
  }

}
