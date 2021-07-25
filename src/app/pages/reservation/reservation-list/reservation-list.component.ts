import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as outlined from "@fortawesome/free-regular-svg-icons";
import {AppService} from "../../../services/app.service";
import {Reservation} from "../../../api/model/reservation";
import * as moment from 'moment';

@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

    pageTitle = '';
    pageDescription = '';

    // ICONS
    icSort = solid.faSort;
    icHeart = solid.faHeart;
    icHeartOutline = outlined.faHeart;

    // STATIC (TEST)
    reservations: Reservation[];


    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService
    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        appService.setPath(activatedRoute.snapshot.data.path);
        this.reservations = appService.generateDummyReservations();
    }

    ngOnInit(): void {
    }

}
