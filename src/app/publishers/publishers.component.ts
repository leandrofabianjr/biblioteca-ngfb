import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PublishersService} from '../services/publishers.service';
import {Publisher} from '../models/publisher';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {
  publishers: Observable<Publisher[]>;

  constructor(private pubSrv: PublishersService) {
    this.publishers = pubSrv.data;
  }

  ngOnInit() { }

}
