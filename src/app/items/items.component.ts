import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ItemsService} from '../services/items.service';
import {Item} from '../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Observable<Item[]>;

  constructor(private itmSrv: ItemsService) {
    this.items = itmSrv.data;
  }

  ngOnInit() {
    this.itmSrv.load();
  }

}
