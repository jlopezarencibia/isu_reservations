import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientControllerService} from "../../../api/services/client-controller.service";
import {from, Observable, of, OperatorFunction, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, map, mapTo, mergeAll, switchMap, tap} from "rxjs/operators";
import {faCalendar, faExclamationCircle, faGlobe, faPhone, faSpinner, faUser} from "@fortawesome/free-solid-svg-icons";
import {AppService} from "../../../services/app.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ClientEntity} from "../../../api/models/client-entity";
import {ActionType} from "../../../app.component";

@Component({
    selector: 'app-client-edit',
    templateUrl: './client-edit.component.html',
    styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

    // ASYNC
    actionStream$ = new Subject();
    loading$?: Observable<boolean>;

    // PAGE INFO
    pageTitle = '';
    pageDescription = '';
    pagePath = '';


    // ICONS
    icName = faUser;
    icType = faGlobe;
    icPhone = faPhone;
    icDate = faCalendar;
    icSpinner = faSpinner;
    icError = faExclamationCircle;

    // FLAGS
    error = false;
    nameSearchFailed = false;
    editing = false;
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

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly clientController: ClientControllerService,
        private readonly appService: AppService,
        private readonly router: Router,
    ) {
        this.pageTitle = activatedRoute.snapshot.data.name;
        this.pageDescription = activatedRoute.snapshot.data.description;
        this.pagePath = activatedRoute.snapshot.data.path;
        this.appService.setPath(this.pagePath);
        this.editorConfig = appService.getEditorConfig();
    }

    ngOnInit(): void {
        const actionStream = this.actionStream$.pipe(
            map((value) => {
                if (this.checkForm()) {
                    return value === 'create' ? ActionType.CREATE : ActionType.EDIT
                } else {
                    return ActionType.CANCEL
                }
            }),
            switchMap((action) => {
                console.log(action)
                switch (action) {
                    case ActionType.CREATE : {
                        if (this.selectedClient) {
                            this.router.navigate(['/reservations', 'create', this.selectedClient.id])
                        } else {
                            this.clientController.create1({
                                body: {
                                    name: this.inputName!,
                                    type: this.inputType!,
                                    phone: this.inputPhone!,
                                    birthDate: this.appService.getDateInMilis(this.inputDate!),
                                    description: this.inputDescription!
                                }
                            }).pipe(
                                catchError((err, caught) => {
                                    console.log('Error while creating user', err);
                                    this.error = true;
                                    return caught;
                                })
                            ).subscribe((result) => {
                                console.log('Created: ', result);
                                this.router.navigate(['/reservations', 'create', result.id]);
                            },
                                (error) => {
                                    console.log('Error in subscription: ', error);
                                });
                        }
                        break;
                    }
                    case ActionType.EDIT : {
                        this.clientController.update1({
                            body: {
                                name: this.inputName,
                                type: this.inputType,
                                phone: this.inputPhone,
                                birthDate: this.appService.getDateInMilis(this.inputDate!),
                                description: this.inputDescription
                            }
                        }).pipe(
                            tap((result) => {
                                console.log('Updated: ', result);
                                this.router.navigate(['/reservations']);
                            })
                        );
                        break;
                    }
                    case ActionType.CANCEL : {
                        this.error = true;
                        return of(false);
                    }
                }
                return of(false);
            })
        )
        this.loading$ = from([actionStream, this.actionStream$.pipe(mapTo(false))]).pipe(mergeAll())
    }

    checkForm(): boolean {
        console.log('Checking form...');
        console.log('name: ', this.inputName);
        console.log('type: ', this.inputType);
        console.log('phone: ', this.inputPhone);
        console.log('description: ', this.inputDescription);
        console.log('date: ', this.inputDate);
        const result = (this.selectedClient ? ((this.inputName as ClientEntity).name!.length > 0) : this.inputName.length > 0) && this.inputType.length > 0 && !!this.inputDate;
        console.log('Form is valid: ', result)
        return result;
    }

    setData(incoming: ClientEntity) {
        this.selectedClient = incoming;
        console.log(incoming)
        this.inputDate = this.appService.getNgbDate(this.selectedClient.birthDate!);
        this.inputPhone = this.selectedClient.phone!;
        this.inputType = this.selectedClient.type!;
        this.inputDescription = this.selectedClient.description!;
        this.formDisabled = true;
        this.error = false;
    }

    findContact: OperatorFunction<string, readonly ClientEntity[]> = (text$: Observable<string>) =>
        text$.pipe(
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
        );

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

}
