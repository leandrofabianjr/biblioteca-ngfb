import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {LocationService} from '../services/location.service';
import {Location} from '../models/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.sass']
})
export class LocationsComponent implements OnInit {
  locations: Observable<Location[]>;

  constructor(private locSrv: LocationService) {
    this.locations = locSrv.data;
  }

  ngOnInit() {
    this.locSrv.load();
  }

}
