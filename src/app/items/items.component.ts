import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../services/items.service';
import {Item} from '../models/item';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Author} from '../models/author';
import {AuthorsNewComponent} from '../authors/authors-new/authors-new.component';
import {Genre} from '../models/genre';
import {GenresNewComponent} from '../genres/genres-new/genres-new.component';
import {Location} from '../models/location';
import {LocationsNewComponent} from '../locations/locations-new/locations-new.component';
import {Publisher} from '../models/publisher';
import {PublishersNewComponent} from '../publishers/publishers-new/publishers-new.component';
import {DialogConfirmationComponent} from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'autores', 'generos', 'ano', 'editora', 'local', 'acoes',];
  items = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private itmSrv: ItemsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.itmSrv.load();
    this.itmSrv.data.subscribe(itms => this.items.data = itms);
    this.items.paginator = this.paginator;
  }

  editAuthor(author: Author) {
    this.dialog.open(AuthorsNewComponent, { data: author });
  }

  editGenre(genre: Genre) {
    this.dialog.open(GenresNewComponent, { data: genre });
  }

  editPublisher(publisher: Publisher) {
    this.dialog.open(PublishersNewComponent, { data: publisher });
  }

  editLocation(location: Location) {
    this.dialog.open(LocationsNewComponent, { data: location });
  }

  remove(item: Item) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.itmSrv.delete(item.id)
          .subscribe(
            itm => null,
            err => console.error('Erro ao remover item')
          );
      }
    });
  }
}
