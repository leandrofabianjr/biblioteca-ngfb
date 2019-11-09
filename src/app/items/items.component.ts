import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IItemDTO, ItemsService} from '../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {
  items: Observable<IItemDTO[]>;

  constructor(private itmSrv: ItemsService) {
    this.items = itmSrv.data;
    this.items.subscribe(i => {
      console.log(i);
    });
  }

  ngOnInit() {
    this.itmSrv.load();
  }

}
