import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {LocationsService} from '../services/locations.service';
import {Location} from '../models/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: Observable<Location[]>;

  constructor(private locSrv: LocationsService) {
    this.locations = locSrv.data;
  }

  ngOnInit() {
    this.locSrv.load();
  }

}
