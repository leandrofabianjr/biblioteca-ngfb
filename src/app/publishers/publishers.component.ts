import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IPublisherDTO, PublishersService} from '../services/publishers.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.sass']
})
export class PublishersComponent implements OnInit {
  publishers: Observable<IPublisherDTO[]>;

  constructor(private pubSrv: PublishersService) {
    this.publishers = pubSrv.data;
  }

  ngOnInit() {
    this.pubSrv.load();
  }

}
