import { Component, OnInit } from '@angular/core';
import {AuthorsService} from '../services/authors.service';
import {Observable} from 'rxjs';
import {Author} from '../models/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Observable<Author[]>;

  constructor(private autSrv: AuthorsService) {
    this.authors = autSrv.data;
  }

  ngOnInit() { }

}
