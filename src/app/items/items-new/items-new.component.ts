import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemsService} from '../../services/items.service';
import {AuthorsService} from '../../services/authors.service';
import {PublishersService} from '../../services/publishers.service';
import {GenresService} from '../../services/genres.service';
import {MatDialog} from '@angular/material';
import {LocationsService} from '../../services/locations.service';
import {Author} from '../../models/author';
import {Publisher} from '../../models/publisher';
import {Genre} from '../../models/genre';
import {Location} from '../../models/location';
import {Item} from '../../models/item';
import {AuthorsNewComponent} from '../../authors/authors-new/authors-new.component';
import {forkJoin} from 'rxjs';
import {PublishersNewComponent} from '../../publishers/publishers-new/publishers-new.component';
import {GenresNewComponent} from '../../genres/genres-new/genres-new.component';
import {LocationsNewComponent} from '../../locations/locations-new/locations-new.component';

@Component({
  selector: 'app-items-new',
  templateUrl: './items-new.component.html',
  styleUrls: ['./items-new.component.scss']
})
export class ItemsNewComponent {

  itemId: string;
  itemForm: FormGroup;
  authors: Author[];
  publishers: Publisher[];
  genres: Genre[];
  locations: Location[];

  message: { tipo: string, texto: string };

  private chamou = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itmSrv: ItemsService,
    private autSrv: AuthorsService,
    private pubSrv: PublishersService,
    private gnrSrv: GenresService,
    private locSrv: LocationsService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.itmSrv.get(id)
          .subscribe(itm => {
              this.itemId = id;
              this.buildForm(itm);
            },
            err => console.error('Erro ao procurar item', err)
          );
      } else {
        this.buildForm();
      }
    });
    autSrv.load();
    pubSrv.load();
    gnrSrv.load();
    locSrv.load();
  }

  private buildForm(item: Item = null) {
    this.itemForm = this.fb.group({
      description: [ item ? item.description : null, Validators.required ],
      authors: [ item ? item.authors : null, Validators.required ],
      publishers: [ item ? item.publishers : null, Validators.required ],
      year: [ item ? item.year : null, [ Validators.required, Validators.pattern('[0-9]*') ] ],
      genres: [ item ? item.genres : null, Validators.required ],
      location: [ item ? item.location : null, Validators.required ]
    });
  }

  save() {
    if (this.itemForm.valid) {

      const item = new Item();
      item.id = this.itemId;
      item.description = this.itemForm.get('description').value;
      item.authors = this.itemForm.get('authors').value;
      item.genres = this.itemForm.get('genres').value;
      item.publishers = this.itemForm.get('publishers').value;
      item.location = this.itemForm.get('location').value;
      item.year = this.itemForm.get('year').value;

      this.itmSrv.save(item)
        .subscribe(itm => {
            this.message = {
              tipo: 'success',
              texto: 'Novo item cadastrado com sucesso!'
            };

            this.itemForm.reset();
            this.router.navigate(['/items', 'new']);
          },
          err => {
            console.error('Erro ao salvar item', err);
            this.message = {
              tipo: 'danger',
              texto: 'Ops, o item não pode ser cadastrado :('
            };
          });
    }
  }

  newAuthor() {
    const dialogRef = this.dialog.open(AuthorsNewComponent);

    dialogRef.afterClosed()
      .subscribe((result: Author) => {
        if (result) {
          this.itemForm.get('authors')
            .setValue(
              (this.itemForm.get('authors').value || []).concat(result)
            );
        }
      });
  }

  newPublisher() {
    const dialogRef = this.dialog.open(PublishersNewComponent);

    dialogRef.afterClosed()
      .subscribe((result: Publisher) => {
        if (result) {
          this.itemForm.get('publishers')
            .setValue(
              (this.itemForm.get('publishers').value || []).concat(result)
            );
        }
      });
  }

  newGenre() {
    const dialogRef = this.dialog.open(GenresNewComponent);

    dialogRef.afterClosed()
      .subscribe((result: Genre) => {
        if (result) {
          this.itemForm.get('genres')
            .setValue(
              (this.itemForm.get('genres').value || []).concat(result)
            );
        }
      });
  }

  newLocation() {
    const dialogRef = this.dialog.open(LocationsNewComponent);

    dialogRef.afterClosed()
      .subscribe((result: Location) => {
        if (result) {
          this.itemForm.get('location').setValue(result);
        }
      });
  }

  searchAuthors(term: string) {
    this.autSrv.data
      .subscribe(
        auts => this.authors = auts.filter(a => a.name.includes(term)).slice(0, 4),
        err => console.error(err)
      );
  }

  searchPublishers(term: string) {
    this.pubSrv.data
      .subscribe(
        edts => this.publishers = edts.filter(p => p.name.includes(term)).slice(0, 4),
        err => console.error(err)
      );
  }

  searchGenres(term: string) {
    this.gnrSrv.data
      .subscribe(
        gens => this.genres = gens.filter(g => g.description.includes(term)).slice(0, 4),
        err => console.error(err)
      );
  }

  searchLocations(term: string) {
    this.locSrv.data
      .subscribe(
        locs => this.locations = locs.filter(l => l.description.includes(term)).slice(0, 4),
        err => console.error(err)
      );
  }
}
