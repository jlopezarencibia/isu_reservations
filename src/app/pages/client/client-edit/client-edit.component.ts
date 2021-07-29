import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {from, Observable, of, OperatorFunction, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, map, mapTo, mergeAll, switchMap} from "rxjs/operators";
import {
    faCalendar,
    faExclamationCircle,
    faGlobe,
    faPhone,
    faSpinner,
    faTrashAlt,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {AppService} from "../../../services/app.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {NgbCalendar, NgbDate, NgbDateAdapter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ActionType} from "../../../app.component";
import {ClientEntity} from "../../../api/models/client-entity";
import {ClientControllerService} from "../../../api/services/client-controller.service";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import * as moment from "moment";

@AutoUnsubscribe()
@Component({
    selector: 'app-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit, OnDestroy {

    // ASYNC
    actionStream$ = new Subject();
    loading$?: Observable<boolean>;

    // PAGE INFO
    pageTitle = '';
    pageDescription = '';
    pagePath = '';
    pathId?: number;


    // ICONS
    icName = faUser;
    icType = faGlobe;
    icPhone = faPhone;
    icDate = faCalendar;
    icSpinner = faSpinner;
    icError = faExclamationCircle;
    icDelete = faTrashAlt;

    // FLAGS
    error = false;
    nameSearchFailed = false;
    formDisabled = false;

    // CONFIG
    editorConfig: AngularEditorConfig;

    // INPUT
    inputName = '';
    inputType = '';
    inputPhone = '';
    inputDescription = '';
    inputDate?: NgbDateStruct;

    selectedClient?: ClientEntity;

    today: NgbDateStruct;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly clientController: ClientControllerService,
        private readonly appService: AppService,
        private readonly router: Router,
        private readonly calendar: NgbCalendar

    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        this.pagePath = activatedRoute.snapshot.data.path;
        this.appService.setPath(this.pagePath);
        this.editorConfig = appService.getEditorConfig();
        this.pathId = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!) ?? -1;
        this.today = calendar.getToday();
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        if (this.pagePath.includes('edit')) {
            this.clientController.findById1({id: this.pathId!}).subscribe(
                result => {
                    // console.log(result)
                    // console.log(this.inputName);
                    this.inputName = result.name!;
                    this.inputDate = this.appService.getNgbDate(result.birthDate!);
                    this.inputPhone = result.phone!;
                    this.inputType = result.type!
                    this.inputDescription = result.description!;
                    // console.log(this.inputName);
                }
            )
        }
        const actionStream = this.actionStream$.pipe(
            map((value) => {
                if (this.checkForm()) {
                    return value === 'create' ? ActionType.CREATE : ActionType.EDIT
                } else {
                    return ActionType.CANCEL
                }
            }),
            switchMap((action) => {
                // console.log(action)
                switch (action) {
                    case ActionType.CREATE : {
                        if (this.selectedClient) {
                            this.router.navigate(['/reservations', 'create', this.selectedClient.id]).then()
                        } else {
                            this.clientController.add({
                                body: {
                                    name: this.inputName!,
                                    type: this.inputType!,
                                    phone: this.inputPhone!,
                                    birthDate: this.appService.getDateInMilis(this.inputDate!),
                                    description: this.inputDescription!
                                }
                            }).pipe(
                                catchError((err, caught) => {
                                    console.log('Error while creating user ', err);
                                    this.error = true;
                                    return caught;
                                })
                            ).subscribe((result: ClientEntity) => {
                                    // console.log('Created: ', result);
                                    this.router.navigate(['/reservations', 'create', result.id]).then();
                                },
                                (error: any) => {
                                    console.log('Error in subscription: ', error);
                                    this.error = true;
                                });
                        }
                        break;
                    }
                    case ActionType.EDIT : {
                        this.clientController.edit({
                            id: this.pathId!,
                            body: {
                                name: this.inputName,
                                type: this.inputType,
                                phone: this.inputPhone,
                                birthDate: this.appService.getDateInMilis(this.inputDate!),
                                description: this.inputDescription
                            }
                        }).pipe(
                            catchError((result, caught) => {
                                console.log('Error while updating: ', result);
                                this.error = true;
                                return caught;
                            })
                        ).subscribe((/*result: ClientEntity*/) => {
                                // console.log('Updated: ', result);
                                this.router.navigate(['/reservations']).then();
                            },
                            (error: any) => {
                                console.log('Error in subscription: ', error);
                                this.error = true;
                            });
                        break;
                    }
                    case ActionType.CANCEL : {
                        this.error = true;
                        break;
                    }
                }
                return of(false);
            })
        )
        this.loading$ = from([actionStream, this.actionStream$.pipe(mapTo(false))]).pipe(mergeAll());
    }

    checkForm(): boolean {
        // console.log('Checking form...');
        // console.log('name: ', this.inputName);
        // console.log('type: ', this.inputType);
        // console.log('phone: ', this.inputPhone);
        // console.log('description: ', this.inputDescription);
        // console.log('date: ', this.inputDate);
        // console.log(moment(this.inputDate?.day+'/'+this.inputDate?.month+'/'+this.inputDate?.year, 'D/M/YYYY'))
        // const result = (this.selectedClient ? ((this.inputName as ClientEntity).name!.length > 0) : this.inputName.length > 0) && this.inputType.length > 0 && !!this.inputDate;
        // console.log('Form is valid: ', result)
        // return result;

        return (this.selectedClient ? ((this.inputName as ClientEntity).name!.length > 0) : this.inputName.length > 0)
            && this.inputType.length > 0
            && moment(this.inputDate?.day + '/' + this.inputDate?.month + '/' + this.inputDate?.year, 'D/M/YYYY').isValid();
    }

    setData(incoming: ClientEntity) {
        this.selectedClient = incoming;
        // console.log(incoming)
        this.inputDate = this.appService.getNgbDate(this.selectedClient.birthDate!);
        this.inputPhone = this.selectedClient.phone!;
        this.inputType = this.selectedClient.type!;
        this.inputDescription = this.selectedClient.description!;
        this.formDisabled = true;
        this.error = false;
    }

    findContact: OperatorFunction<string, readonly ClientEntity[]> = (text$: Observable<string>) => {
        if (this.pagePath.includes('create')) {
            return text$.pipe(
                debounceTime(300),
                distinctUntilChanged(),
                switchMap(term =>
                    this.clientController.findByName({term}).pipe(
                        catchError((err) => {
                                console.log(err)
                                return of([]);
                            }
                        )
                    )
                )
            )
        } else {
            return of([]);
        }
    };

    formatter = (c: { name: string }) => c.name;



    resetForm(): void {
        this.inputName = '';
        this.inputType = '';
        this.inputPhone = '';
        this.inputDescription = '';
        this.inputDate = undefined;
        this.selectedClient = undefined;
        this.formDisabled = false;
        this.error = false;
    }

    doRemove = () => {
        this.clientController.removeById1({id: this.pathId!}).subscribe(
            result => {
                console.log('Deleted: ', result);
                this.router.navigate(['/reservations']).then();
            },
            error => {
                console.log('Error: ', error);
            }
        )
    }

}
