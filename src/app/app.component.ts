import {Component} from '@angular/core';
import {faList, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "./services/app.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // ICONS
    icAdd = faPlus;
    icList = faList;

    path: Observable<string>;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly appService: AppService
    ) {
        this.path = appService.path;
    }
}

export enum ActionType {
    CREATE = 'create',
    EDIT = 'edit',
    CANCEL = 'cancel'
}

export enum ReservationsSortType {
    DATE_ASC = 'date_asc',
    DATE_DESC = 'date_desc',
    ALPH_ASC = 'alph_asc',
    ALPH_DESC = 'alph_desc',
    RANK = 'rank',
}

export enum ClientsSortType {
    NAME_ASC = 'name_asc',
    NAME_DESC = 'name_desc',
    DATE_ASC = 'birthDate_asc',
    DATE_DESC = 'birthDate_desc',
    TYPE_ASC = 'type_asc',
    TYPE_DESC = 'type_desc',

}
