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
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
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
    formDisabled = false;
    selectedClient?: ClientEntity;
    today: NgbDateStruct;

    // CONFIG
    editorConfig: AngularEditorConfig;

    // INPUT
    inputName = '';
    inputType = '';
    inputPhone = '';
    inputDescription = '';
    inputDate?: NgbDateStruct;

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

    ngOnInit(): void {
        if (this.pagePath.includes('edit')) {
            this.clientController.findById1({id: this.pathId!}).subscribe(
                result => {
                    this.inputName = result.name!;
                    this.inputDate = this.appService.getNgbDate(result.birthDate!);
                    this.inputPhone = result.phone!;
                    this.inputType = result.type!
                    this.inputDescription = result.description!;
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
                        ).subscribe(() => {
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

    /**
     * Checks the form validation
     *
     * @return <b>true</b> - if the form is valid
     * */
    checkForm(): boolean {
        return (this.selectedClient ? ((this.inputName as ClientEntity).name!.length > 0) : this.inputName.length > 0)
            && this.inputType.length > 0
            && moment(this.inputDate?.day + '/' + this.inputDate?.month + '/' + this.inputDate?.year, 'D/M/YYYY').isValid();
    }

    /**
     * Sets the information of the selected Client to the inputs and disables edition
     *
     * @param incoming - the Client information
     * */
    setData(incoming: ClientEntity) {
        this.selectedClient = incoming;
        this.inputDate = this.appService.getNgbDate(this.selectedClient.birthDate!);
        this.inputPhone = this.selectedClient.phone!;
        this.inputType = this.selectedClient.type!;
        this.inputDescription = this.selectedClient.description!;
        this.formDisabled = true;
        this.error = false;
    }

    /**
     * Search the Clients that matches with the written in the input
     *
     * @param text$ - the Term to search
     * @return ClientEntity[] List of possible Clients that matches the term
     * */
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

    /**
     * Formats th result to only show the name
     *
     * @param c - the Client
     * @return string the Client name
     * */
    formatter = (c: { name: string }) => c.name;

    /**
     * Resets the form in case of locked when a Client has been selected from search
     * */
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

    /**
     * Deletes the Client
     * */
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

    /**
     * Required for <code>@AutoUnsubscribe()</code> to work properly
     * */
    ngOnDestroy(): void {
    }

}
