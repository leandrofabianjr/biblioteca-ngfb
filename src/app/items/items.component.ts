import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../services/items.service';
import {Item} from '../models/item';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'autores', 'generos', 'ano', 'editora', 'local', 'acoes',];
  items = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private itmSrv: ItemsService) { }

  ngOnInit() {
    this.itmSrv.load();
    this.itmSrv.data.subscribe(itms => this.items.data = itms);
    this.items.paginator = this.paginator;
  }
}
