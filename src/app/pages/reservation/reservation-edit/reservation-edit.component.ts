import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {faCalendar, faGlobe, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  pageTitle = '';
  pageDescription = '';

  // ICONS
  icName = faUser;
  icType = faGlobe;
  icPhone = faPhone;
  icDate = faCalendar;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appService: AppService
  ) {
      this.pageTitle = activatedRoute.snapshot.data.name;
      this.pageDescription = activatedRoute.snapshot.data.description;
      this.appService.setPath(activatedRoute.snapshot.data.path)
  }

  ngOnInit(): void {
  }

}
