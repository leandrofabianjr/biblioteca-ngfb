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
import {CollectionStats} from '../services/stats.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  loading = true;
  displayedColumns: string[] = ['Descrição', 'Autores', 'Gêneros', 'Ano', 'Editora', 'Local'];
  displayedColumnsAttrs: string[] = ['description', 'authors', 'genres', 'year', 'publisher', 'location'];
  searchTerms: string[] = new Array(this.displayedColumnsAttrs.length);
  items = new MatTableDataSource<Item>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  page = 0;
  limit: number;
  sort: string;
  dir: 'asc'|'desc';
  itemsStats: CollectionStats;

  constructor(
    private itmSrv: ItemsService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.limit = +params.limit || 5;
      this.sort = params.sort || this.displayedColumnsAttrs[0];
      this.dir = +params.sort ? 'desc' : 'asc';
    });
  }

  ngOnInit() {
    this.itmSrv.data.subscribe(itms => {
      this.items.data = itms;
      this.loading = false;
    });
    this.itmSrv.load(this.limit, this.sort, this.dir);
    this.itmSrv.stats.subscribe(s => this.itemsStats = s);
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
    if (p.pageIndex !== this.page) {
      this.loading = true;
      this.page = p.pageIndex;
      if (p.pageIndex < this.page) {
        this.itmSrv.loadPrev();
      } else {
        this.itmSrv.loadNext();
      }
    }
    this.limit = p.pageSize;
    this.navigate();
  }

  private navigate() {
    const queryParams: any = {};

    if (this.limit) {
      queryParams.size = this.limit;
    }
    if (this.sort) {
      queryParams.sort = this.sort;
    }

    this.router.navigate([ '/items' ], { queryParams });
  }

  search(column: string, term: string) {
    this.searchTerms[this.displayedColumnsAttrs.indexOf(column)] = term;
    this.searchTerms.map((t, i) => {
      if (t) {
        // this.itmSrv.load(this.limit, this.sort, this.dir, [t, 'array-contains', term]);
      }
    });
  }
}
