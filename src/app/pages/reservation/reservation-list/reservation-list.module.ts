import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReservationListComponent} from './reservation-list.component';
import {RouterModule} from "@angular/router";
import {NgbDropdownModule, NgbPaginationModule, NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModule} from "../../../pipes/pipes.module";
import {FormsModule} from "@angular/forms";
import {PageHeaderModule} from "../../../components/page-header/page-header.module";
import {NoItemsModule} from "../../../components/no-items/no-items.module";


@NgModule({
  declarations: [
    ReservationListComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
                {
                    path: '',
                    component: ReservationListComponent
                }
            ]
        ),
        NgbPaginationModule,
        NgbDropdownModule,
        FontAwesomeModule,
        PipesModule,
        NgbRatingModule,
        FormsModule,
        PageHeaderModule,
        NoItemsModule,
    ]
})
export class ReservationListModule {
}
