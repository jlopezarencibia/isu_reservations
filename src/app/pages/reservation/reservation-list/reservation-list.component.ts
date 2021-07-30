import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as solid from "@fortawesome/free-solid-svg-icons";
import {
    faSortAlphaDownAlt,
    faSortAlphaUp,
    faSortAmountDown,
    faSortNumericDownAlt,
    faSortNumericUp
} from "@fortawesome/free-solid-svg-icons";
import {AppService} from "../../../services/app.service";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {mapTo, mergeAll, shareReplay, switchMap, tap} from "rxjs/operators";
import {ReservationEntity} from "../../../api/models/reservation-entity";
import {ReservationControllerService} from "../../../api/services/reservation-controller.service";
import {ReservationsSortType} from "../../../app.component";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
    selector: 'app-reservation-list',
    templateUrl: './reservation-list.component.html',
    styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit, OnDestroy {

    // PAGE INFO
    pageTitle = '';
    pageDescription = '';

    // FLAGS
    pageSize = 10;
    page = 1;
    sortBy = 'date';
    sortDirection = 'ASC';
    sortOption = ReservationsSortType.DATE_ASC;

    // ASYNC
    reservations$?: Observable<ReservationEntity[]>;
    reservationSubject$ = new BehaviorSubject(this.sortOption);
    loading$?: Observable<boolean>;
    count$?: Observable<number>;

    // ICONS
    icSort = solid.faSort;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService,
        private readonly reservationController: ReservationControllerService
    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        appService.setPath(activatedRoute.snapshot.data.path);
    }

    ngOnInit(): void {
        const reservationStream = this.reservationSubject$.pipe(
            switchMap((input) => {
                this.sortOption = input;
                this.setSortOptions(input);
                this.reservations$ = this.reservationController.paged({
                    options: {
                        page: this.page - 1,
                        pageSize: this.pageSize,
                        sortBy: this.sortBy,
                        sortDirection: this.sortDirection
                    }
                }).pipe(
                    tap((v) => console.log(v))
                )
                return of(false);
            }),
            shareReplay()
        )

        this.loading$ = from([reservationStream, this.reservationSubject$.pipe(mapTo(false))]).pipe(mergeAll());
        this.count$ = this.reservationController.count();
    }

    /**
     * Toggles Favorite status
     * @param reservation the Reservation to toggle Favorite status
     * */
    toggleFavorite(reservation: ReservationEntity) {
        this.reservationController.toggleFavorite({id: reservation.id!}).subscribe();
        reservation.favorite = !reservation.favorite;
    }

    /**
     * Sets the Field, Direction and Icon to use while sorting the list
     *
     * @param option - the Sorting options
     * */
    setSortOptions(option: ReservationsSortType) {
        console.log(option);
        switch (option) {
            case ReservationsSortType.DATE_ASC: {
                this.sortBy = 'date';
                this.sortDirection = 'ASC';
                this.icSort = faSortNumericUp;
                break;
            }
            case ReservationsSortType.DATE_DESC: {
                this.sortBy = 'date';
                this.sortDirection = 'DESC';
                this.icSort = faSortNumericDownAlt;
                break;
            }
            case ReservationsSortType.ALPH_ASC: {
                this.sortBy = 'location';
                this.sortDirection = 'ASC';
                this.icSort = faSortAlphaUp;
                break;
            }
            case ReservationsSortType.ALPH_DESC: {
                this.sortBy = 'location';
                this.sortDirection = 'DESC';
                this.icSort = faSortAlphaDownAlt;
                break;
            }
            case ReservationsSortType.RANK: {
                this.sortBy = 'ranking';
                this.sortDirection = 'DESC';
                this.icSort = faSortAmountDown;
                break;
            }
        }
        console.log('Sort by: ', this.sortBy);
        console.log('Sort dir: ', this.sortDirection);
    }

    /**
     * Refresh the list elements with the given Sorting options
     *
     * @param sortOption - the Sorting options
     * */
    loadList(sortOption: ReservationsSortType) {
        this.reservationSubject$.next(sortOption);
    }

    /**
     * Required for <code>@AutoUnsubscribe()</code> to work properly
     * */
    ngOnDestroy(): void {
    }
}
