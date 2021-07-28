import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faCalendar, faClock, faGlobe, faMapPin, faPhone, faUser} from "@fortawesome/free-solid-svg-icons";
import {AppService} from "../../../services/app.service";
import {NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {NgbTime} from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";
import * as moment from "moment";
import {from, Observable, of, Subject} from "rxjs";
import {map, mergeAll, switchMap, tap} from "rxjs/operators";
import {ClientControllerService} from "../../../api/services/client-controller.service";

@Component({
    selector: 'app-reservation-edit',
    templateUrl: './reservation-edit.component.html',
    styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

    pageTitle = '';
    pageDescription = '';

    // ASYNC
    createStream$ = new Subject();
    loading$?: Observable<boolean>;

    // ICONS
    icLocation = faMapPin;
    icCalendar = faCalendar;

    // INPUTS
    inputLocationName = ''
    inputDate?: NgbDateStruct;
    inputTime: NgbTimeStruct = {hour: 12, minute: 0, second: 0}
    inputRanking = 0;
    inputFavorite = false;

    // FLAGS
    error = false;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService,
        private readonly clientController: ClientControllerService,
        private readonly router: Router
    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        this.appService.setPath(activatedRoute.snapshot.data.path)
    }

    ngOnInit(): void {
        const createStream = this.createStream$.pipe(
            tap(() => console.log("Creating reservation...")),
            map(() => this.checkForm()),
            switchMap((value) => {
                if (!value) {
                    this.error = true;
                    console.log('Cannot create reservation!. Invalid form.')
                } else {
                    console.log('Getting Client Id...');
                    const clientId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
                    console.log('Client Id: ', clientId);

                    console.log(this.appService.getDateTimeInMilis(this.inputDate!, this.inputTime));
                    this.clientController.reserve({id: clientId, body: {
                        location: this.inputLocationName,
                            date: this.appService.getDateTimeInMilis(this.inputDate!, this.inputTime),
                            favorite: this.inputFavorite,
                            ranking: this.inputRanking
                        }}).subscribe(result => {
                        console.log(result);
                        this.router.navigate(['/reservations']);
                    })
                    // this.clientController.create1({body: {name: this.inputName!, phone: this.inputPhone!, description: this.inputDescription!, birthDate: this.appService.getDateInMilis(this.inputDate!)}}).pipe(
                    //     tap((value) => console.log('Client created...', value))
                    // ).subscribe(result => {
                    //     this.router.navigate(['/reservations/create', result.id])
                    // })
                }
                return of(false);
            })
        )
        this.loading$ = from([createStream, this.createStream$.pipe(map((value => !!value)))]).pipe(mergeAll())
    }

    checkForm():boolean {
        return (!!this.inputDate && this.inputLocationName.length > 0)
    }

}
