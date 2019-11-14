import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemsService} from '../services/items.service';
import {Item} from '../models/item';
import {MatDialog, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Author} from '../models/author';
import {AuthorsNewComponent} from '../authors/authors-new/authors-new.component';
import {Genre} from '../models/genre';
import {GenresNewComponent} from '../genres/genres-new/genres-new.component';
import {Location} from '../models/location';
import {LocationsNewComponent} from '../locations/locations-new/locations-new.component';
import {Publisher} from '../models/publisher';
import {PublishersNewComponent} from '../publishers/publishers-new/publishers-new.component';
import {DialogConfirmationComponent} from '../dialog-confirmation/dialog-confirmation.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  displayedColumns: string[] = ['descricao', 'autores', 'generos', 'ano', 'editora', 'local', 'acoes', ];
  items = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  page: number;
  limit: number;
  sort: string;
  dir: 'asc'|'desc';

  constructor(
    private itmSrv: ItemsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.page = +params.page || 0;
      this.limit = +params.limit || 5;
      this.sort = params.sort || 'description';
      this.dir = +params.sort ? 'desc' : 'asc';
    });
  }

  ngOnInit() {
    this.itmSrv.data.subscribe(itms => {
      this.items.data = itms;
    });
    this.paginator.page.subscribe(this.changePage);
    this.items.paginator = this.paginator;
    this.itmSrv.load(this.limit, this.sort, this.dir);
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

  changePage(p: PageEvent) {
    this.page = p.pageIndex;
    this.limit = p.pageSize;
    this.navigate();
  }

  private navigate() {
    const queryParams: any = {};

    if (this.page) {
      queryParams.page = this.page ;
    }
    if (this.limit) {
      queryParams.size = this.limit;
    }
    if (this.sort) {
      queryParams.sort = this.sort;
    }

    this.router.navigate([ '/items' ], { queryParams });
  }
}
