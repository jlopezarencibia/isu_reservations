import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as solid from "@fortawesome/free-solid-svg-icons";
import * as outlined from "@fortawesome/free-regular-svg-icons";
import {AppService} from "../../../services/app.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ReservationEntity} from "../../../api/models/reservation-entity";
import {ReservationControllerService} from "../../../api/services/reservation-controller.service";

@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

    pageTitle = '';
    pageDescription = '';

    // ASYNC
    reservations$?: Observable<ReservationEntity[]>;
    count$?: Observable<number>;

    // ICONS
    icSort = solid.faSort;
    icHeart = solid.faHeart;
    icHeartOutline = outlined.faHeart;

    // FLAGS
    pageSize = 10;
    page = 1;
    sortBy = 'date';
    sortDirection = 'ASC';

    // STATIC (TEST)
    // reservations: ReservationEntity[] = [];


    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService,
        private readonly reservationController: ReservationControllerService
    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        appService.setPath(activatedRoute.snapshot.data.path);
        // this.reservations = appService.generateDummyReservations();
    }

    ngOnInit(): void {
        this.reservations$ = this.reservationController.paged({
            options: {
                page: this.page-1,
                pageSize: this.pageSize,
                sortBy: this.sortBy,
                sortDirection: this.sortDirection
            }
        }).pipe(
            tap((v) => console.log(v))
        );

        this.count$ = this.reservationController.count();
    }

    toggleFavorite(reservation: ReservationEntity) {
        console.log(reservation.favorite)
        this.reservationController.toggleFavorite({id: reservation.id!}).subscribe();
        reservation.favorite = !reservation.favorite;
    }
}
