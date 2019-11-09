import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ILocationDTO, LocationService} from '../services/location.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.sass']
})
export class LocationsComponent implements OnInit {
  locations: Observable<ILocationDTO[]>;

  constructor(private locSrv: LocationService) {
    this.locations = locSrv.data;
  }

  ngOnInit() {
    this.locSrv.load();
  }

}
