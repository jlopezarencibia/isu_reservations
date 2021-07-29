import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
    faCalendar,
    faExclamationCircle,
    faMapPin,
    faSpinner,
    faTrashAlt,
    faUpload,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {AppService} from "../../../services/app.service";
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {from, Observable, of, Subject} from "rxjs";
import {catchError, map, mapTo, mergeAll, shareReplay, switchMap, tap} from "rxjs/operators";
import {ActionType} from "../../../app.component";
import {ReservationEntity} from "../../../api/models/reservation-entity";
import {ClientEntity} from "../../../api/models/client-entity";
import {ReservationControllerService} from "../../../api/services/reservation-controller.service";
import {ClientControllerService} from "../../../api/services/client-controller.service";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {DomSanitizer} from "@angular/platform-browser";

@AutoUnsubscribe()
@Component({
    selector: 'app-reservation-edit',
    templateUrl: './reservation-edit.component.html',
    styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit, OnDestroy {

    // PAGE INFO
    pageTitle = '';
    pageDescription = '';
    pagePath = '';
    pathId?: number;

    // ASYNC
    actionStream$ = new Subject();
    loading$?: Observable<boolean>;
    owner$?: Observable<ClientEntity>;

    // ICONS
    icLocation = faMapPin;
    icCalendar = faCalendar;
    icUser = faUser;
    icError = faExclamationCircle;
    icSpinner = faSpinner;
    icDelete = faTrashAlt;
    icUpload = faUpload;

    // INPUTS
    inputLocationName = ''
    inputDate?: NgbDateStruct;
    inputTime: NgbTimeStruct = {hour: 12, minute: 0, second: 0}
    inputRanking = 0;
    inputFavorite = false;
    displayImage = '';

    // FLAGS
    error = false;
    today: NgbDateStruct;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService,
        private readonly clientController: ClientControllerService,
        private readonly reservationController: ReservationControllerService,
        private readonly router: Router,
        private readonly sanitizer: DomSanitizer,
        private ngbCalendar: NgbCalendar,
    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        this.pagePath = activatedRoute.snapshot.data.path;
        this.appService.setPath(this.pagePath)
        this.pathId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
        this.today = ngbCalendar.getToday();
    }

    ngOnInit(): void {
        this.inputDate = this.today;
        const inputImage = document.getElementById('imageInput')!;
        inputImage.addEventListener("change", (evt: any) => {
            if (evt.target.files && evt.target.files[0]) {
                const src: File = evt.target.files[0]
                const filerReader = new FileReader();
                filerReader.readAsDataURL(src);
                console.log(src);
                filerReader.addEventListener("load", (fn) => {
                    if (fn.target && fn.target.result) {
                        this.displayImage = this.sanitizer.sanitize(SecurityContext.URL, fn.target.result.toString())!;
                    }
                })
            }
        })
        if (this.pagePath.includes('edit')) {
            this.reservationController.findById({id: this.pathId!}).subscribe(
                result => {
                    this.inputLocationName = result.location!;
                    this.inputDate = this.appService.getNgbDate(result.date!);
                    this.inputTime = this.appService.getNgbTime(result.date!);
                    this.inputRanking = result.ranking!;
                    this.inputFavorite = result.favorite!;
                    this.displayImage = result.image!;
                }
            )
        }
        const actionStream = this.actionStream$.pipe(
            map((value) => {
                console.log('Checking form...')
                console.log(this.pathId)
                if (this.checkForm()) {
                    return value === 'create' ? ActionType.CREATE : ActionType.EDIT
                } else {
                    return ActionType.CANCEL
                }
            }),
            switchMap((action) => {
                console.log('action: ', action);
                switch (action) {
                    case ActionType.CREATE: {
                        console.log(this.inputRanking)
                        this.clientController.reserve({
                            id: this.pathId!, body: {
                                location: this.inputLocationName,
                                date: this.appService.getDateTimeInMilis(this.inputDate!, this.inputTime),
                                favorite: this.inputFavorite,
                                ranking: this.inputRanking,
                                image: this.displayImage
                            }
                        }).pipe(
                            catchError((err, caught) => {
                                console.log('Error while reserving: ', err);
                                this.error = true;
                                return caught;
                            })
                        ).subscribe(
                            (result: ReservationEntity) => {
                                console.log('Created: ', result);
                                this.router.navigate(['/reservations']);
                            },
                            (error: any) => {
                                console.log('Error in sub: ', error);
                                this.error = true;
                                return of(false);
                            })
                        break;
                    }
                    case ActionType.EDIT: {
                        console.log(this.inputFavorite);
                        this.reservationController.update({
                            id: this.pathId!, body: {
                                location: this.inputLocationName!,
                                date: this.appService.getDateTimeInMilis(this.inputDate!, this.inputTime!),
                                favorite: this.inputFavorite!,
                                ranking: this.inputRanking!,
                                image: this.displayImage
                            }
                        }).pipe(
                            tap(val => console.log(val)),
                            catchError((err, caught) => {
                                console.log('Error while reserving: ', err);
                                this.error = true;
                                return caught;
                            })
                        )
                            .subscribe(
                                (result: ReservationEntity) => {
                                    console.log('Created: ', result);
                                    this.router.navigate(['/reservations']);
                                },
                                (error: any) => {
                                    console.log('Error in sub: ', error);
                                    this.error = true;
                                    return of(false)
                                })
                        break;
                    }
                    case ActionType.CANCEL: {
                        this.error = true;
                        break;
                    }
                }
                return of(false);
            }),
            shareReplay()
        )
        this.loading$ = from([actionStream, this.actionStream$.pipe(mapTo(false))]).pipe(mergeAll())
        this.owner$ = this.clientController.findById1({id: this.pathId!})
    }

    checkForm(): boolean {
        return (!!this.inputDate && this.inputLocationName.length > 0)
    }

    doRemove = () => {
        this.reservationController.removeById({id: this.pathId!}).subscribe(
            result => {
                console.log('Deleted: ', result);
                this.router.navigate(['/reservations']);
            },
            error => {
                console.log('Error: ', error);
            }
        )
    }

    ngOnDestroy(): void {
    }
}
